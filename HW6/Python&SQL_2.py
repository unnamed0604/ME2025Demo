import sqlite3
import re

conn = sqlite3.connect("users.db")
cursor = conn.cursor()


def is_valid_email(email):
    return re.match(r'^[A-Za-z0-9._%+-]+@gmail\.com$', email)

def has_sequential_numbers(password):
    digits = ''.join([ch for ch in password if ch.isdigit()])
    if len(digits) < 3:
        return False  # 少於3個數字不構成連號

    # 升序與降序判斷
    for i in range(len(digits) - 2):
        seq = digits[i:i+3]
        if seq in "0123456789" or seq in "9876543210":
            return True
    return False

def check_password(password):
    errors = []

    if len(password) < 8:
        errors.append("密碼必須超過8個字元")

    if not re.search(r'[A-Z]', password) or not re.search(r'[a-z]', password):
        errors.append("密碼需包含英文大小寫")

    if not re.search(r'[!@#$%^&*(),.?":{}|<>/+=_~`', password):
        errors.append("密碼需包含特殊字元")

    # 檢查是否連號
    if has_sequential_numbers(password):
        errors.append("密碼中的數字不可連號 (如123或987)")

    if '-' in password:
        errors.append("密碼不可包含 '-' 連字號")

    return errors

def sign_up():
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    name = input("請輸入名稱: ")

    # 驗證 Email
    while True:
        email = input("請輸入 Email: ")
        if is_valid_email(email):
            break
        else:
            print(" Email 格式不符，請重新輸入。")

    # 驗證密碼
    while True:
        password = input("請輸入密碼: ")
        errors = check_password(password)
        if not errors:
            break
        else:
            print("".join(errors) + "，請重新輸入。")

    # 檢查是否已有此 Email
    cursor.execute("SELECT * FROM user_data WHERE email = ?", (email,))
    existing = cursor.fetchone()

    print(f"\n註冊資訊: save {name} | {email} | {password}")
    confirm = input("是否儲存? (Y 更新/儲存，N 返回): ").upper()

    if confirm == "Y":
        if existing:
            print("此 Email 已存在，是否更新資訊? (Y/N)")
            update = input().upper()
            if update == "Y":
                cursor.execute("UPDATE user_data SET name=?, password=? WHERE email=?", (name, password, email))
                print("已更新使用者資料。")
        else:
            cursor.execute("INSERT INTO user_data (name, email, password) VALUES (?, ?, ?)", (name, email, password))
            print("註冊成功！")

        conn.commit()

    conn.close()

def sign_in():
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    name = input("請輸入姓名: ")
    email = input("請輸入 Email: ")

    cursor.execute("SELECT * FROM user_data WHERE name=? AND email=?", (name, email))
    user = cursor.fetchone()

    if not user:
        print("名字或 Email 錯誤。")
        print("(a) sign up")
        print("(b) sign in")
        choice = input(" (按下”a”返回註冊模式)").lower()

        if choice == "a":
            sign_up()
        elif choice == "b":
            sign_in()
        else:
            print("輸入錯誤，請重新選擇。")


    # 密碼驗證
    while True:
        password = input("請輸入密碼: ")

        if password == user[2]:  # user_data(name, email, password)
            print("登入成功")
            break
        else:
            print("密碼錯誤，忘記密碼(Y/N)")
            choice = input().upper()
            if choice == "Y":
                print("請重新註冊帳號。")
                sign_up()
                break
            elif choice == "N":
                continue
            else:
                print("輸入錯誤。")
                break

    conn.close()


def main():
    while True:
        print("\n=== 登入系統 ===")
        print("(a) sign up")
        print("(b) sign in")
        choice = input("請輸入選項: ").lower()

        if choice == "a":
            sign_up()
        elif choice == "b":
            sign_in()
        else:
            print("輸入錯誤，請重新選擇。")


if __name__ == "__main__":
    main()