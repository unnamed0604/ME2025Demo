from flask import Flask, render_template, request, redirect, url_for, flash, session, g, jsonify
import sqlite3
import os

APP_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE = os.path.join(APP_DIR, "users.db")

app = Flask(__name__)

def get_db():
    db = getattr(g, "_database", None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, "_database", None)
    if db is not None:
        db.close()

# ---- Login page ----
@app.route("/", methods=["GET", "POST"])
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "")

        db = get_db()
        cur = db.execute("SELECT * FROM teachers WHERE username = ?;", (username,))
        teacher = cur.fetchone()

        if teacher is None:
            # username not found
            flash("錯誤的名稱：系統內無此教師帳號。", "error")
            return render_template("login.html", username=username)
        if password != teacher["password"]:
            # wrong password
            flash("錯誤的密碼：密碼不正確。", "error")
            return render_template("login.html", username=username)
        # success
        session.clear()
        session["teacher_username"] = teacher["username"]
        flash("登入成功。", "success")
        return redirect(url_for("grades"))
    else:
        return render_template("login.html")

# ---- Grades page ----
def login_required(fn):
    from functools import wraps
    @wraps(fn)
    def wrapper(*args, **kwargs):
        if "teacher_username" not in session:
            flash("請先登入。", "error")
            return redirect(url_for("login"))
        return fn(*args, **kwargs)
    return wrapper

@app.route("/grades", methods=["GET"])
@login_required
def grades():
    db = get_db()
    cur = db.execute("SELECT name, student_id, score FROM grades ORDER BY student_id ASC;")
    rows = cur.fetchall()
    teacher = session.get("teacher_username")
    return render_template("grade.html", grades=rows, teacher=teacher)

# Add a new grade (form submit)
@app.route("/add", methods=["POST"])
@login_required
def add_grade():
    name = request.form.get("name", "").strip()
    student_id = request.form.get("student_id", "").strip()
    score = request.form.get("score", "").strip()

    # basic validation
    if not name or not student_id or not score:
        flash("請填寫學生姓名、學號與成績。", "error")
        return redirect(url_for("grades"))
    try:
        sid = int(student_id)
    except ValueError:
        flash("學號必須為數字。", "error")
        return redirect(url_for("grades"))
    try:
        sc = int(score)
    except ValueError:
        flash("成績必須為數字。", "error")
        return redirect(url_for("grades"))

    db = get_db()
    db.execute("INSERT INTO grades (name, student_id, score) VALUES (?, ?, ?);", (name, sid, sc))
    db.commit()
    flash("新增成功。", "success")
    return redirect(url_for("grades"))

# Delete grade by student_id (form)
@app.route("/delete", methods=["POST"])
@login_required
def delete_grade():
    student_id = request.form.get("student_id_delete", "").strip()
    if not student_id:
        flash("請輸入欲刪除的學號。", "error")
        return redirect(url_for("grades"))
    try:
        sid = int(student_id)
    except ValueError:
        flash("學號必須為數字。", "error")
        return redirect(url_for("grades"))

    db = get_db()
    cur = db.execute("DELETE FROM grades WHERE student_id = ?;", (sid,))
    db.commit()
    if cur.rowcount == 0:
        flash(f"找不到學號 {sid} 的學生資料。", "error")
    else:
        flash(f"已刪除學號 {sid} 的學生資料。", "success")
    return redirect(url_for("grades"))

@app.route("/logout")
@login_required
def logout():
    session.clear()
    flash("已登出。", "success")
    return redirect(url_for("login"))

# Optional: API endpoint to fetch grades as JSON (sorted)
@app.route("/api/grades", methods=["GET"])
@login_required
def api_grades():
    db = get_db()
    cur = db.execute("SELECT name, student_id, score FROM grades ORDER BY student_id ASC;")
    rows = [dict(r) for r in cur.fetchall()]
    return jsonify(rows)

if __name__ == "__main__":
    if not os.path.exists(DATABASE):
        print("資料庫 users.db 不存在。請先執行 init_db.py 建立資料庫，或確認 users.db 在專案根目錄。")
    app.run()




