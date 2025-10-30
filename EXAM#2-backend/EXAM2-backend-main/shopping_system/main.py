from flask import Flask, request, jsonify, render_template, session, redirect, url_for, flash
from datetime import datetime
import sqlite3
import logging
import re 
import os

app = Flask(__name__)
app.secret_key = "your_secret_key_here"

@app.route('/')
def index():
    if 'username' not in session:
        return redirect(url_for('page_login'))
    return render_template('index.html', username=session['username'])

# 路徑修改
def get_db_connection():
    db_path = './shopping_data.db'
    if not os.path.exists(db_path):
        logging.error(f"Database file not found at {db_path}")
        return None
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn

# 補齊空缺程式碼
@app.route('/page_login', methods=['GET', 'POST'])
def page_login():
    """
    登入頁面
    """
    try:
        if request.method == 'POST':
            # 如果 Content-Type 是 JSON
            if request.is_json:
                data = request.get_json()
            else:
                # 從 form 表單抓資料
                data = request.form
            username = data.get('username', '').strip()
            password = data.get('password', '').strip()
            result = login_user(username, password)
            if result["status"] == "success":
                session['username'] = username
                return render_template('index.html')
        return render_template('page_login_.html')
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/page_register', methods=['GET', 'POST'])
def page_register():
    """
    註冊頁面
    """
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
        else:
        # 從 form 表單抓資料
            data = request.form
            username = data.get('username', '').strip()
            password = data.get('password', '').strip()
            email = data.get('email', '').strip()

        # 檢查帳號是否重複
        conn = get_db_connection()
        if conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM users WHERE username = ?", (username,))
            user_exist = cursor.fetchone()
            if user_exist:
                return jsonify({"status": "error", "message": "帳號已存在，成功修改密碼或信箱"})

            # 密碼規則
            pwd_ok = len(password) >= 8 and re.search(r'[A-Z]', password) and re.search(r'[a-z]', password)
            if not pwd_ok:
                return jsonify({"status": "error", "message": "密碼必須超過8個字元且包含英文大小寫，重新輸入"})

            # 信箱規則
            if not re.match(r'^[\w\.-]+@gmail\.com$', email):
                return jsonify({"status": "error", "message": "Email 格式不符重新輸入"})

            # 新增使用者
            cursor.execute("INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
                           (username, password, email))
            conn.commit()
            conn.close()
            return jsonify({"status": "success", "message": "註冊成功"})
        return render_template('page_login_.html')
    return render_template('page_register.html')


def login_user(username, password):
    """
    登入功能
    """
    conn = get_db_connection()
    if conn is not None:
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM users WHERE username = ? AND password = ?", (username, password))
            user = cursor.fetchone()
            if user:
                return {"status": "success", "message": "登入成功"}
            else:
                return {"status": "error", "message": "帳號或密碼錯誤"}
        except sqlite3.Error as e:
            logging.error(f"Database query error: {e}")
            return {"status": "error", "message": "發生錯誤"}
        finally:
            conn.close()
    else:
        return {"status": "error", "message": "資料庫連線失敗"}


@app.route('/logout')
def logout():
    """
    登出
    """
    session.pop('username', None)
    return redirect(url_for('page_login'))


if __name__ == '__main__':
    app.run(debug=True)
