import sqlite3

# 連線到資料庫
conn = sqlite3.connect("ID_data.db")
cursor = conn.cursor()

cursor.execute("SELECT letter, city FROM city_map")
city_map = dict(cursor.fetchall())




def validate_taiwan_id(id_str, city_map):
    id_str = id_str.strip().upper()

    # 基本格式檢查
    if len(id_str) != 10 or not id_str[0].isalpha() or not id_str[1:].isdigit():
        return False, "請重新輸入"

    # 確認首碼存在於 city_map
    if id_str[0] not in city_map:
        return False, "請重新輸入"
    city = city_map[id_str[0]]

    # 性別
    gender_num = id_str[1]
    gender = "male" if (gender_num == "1" or gender_num=="8")  else "female" if (gender_num == "2" or gender_num=="9") else None
    if gender is None:
        return False, "請重新輸入"

    # 驗證碼算法
    letters = {
        'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15, 'G': 16, 'H': 17,
        'I': 34, 'J': 18, 'K': 19, 'L': 20, 'M': 21, 'N': 22, 'O': 35, 'P': 23,
        'Q': 24, 'R': 25, 'S': 26, 'T': 27, 'U': 28, 'V': 29, 'W': 32, 'X': 30,
        'Y': 31, 'Z': 33
    }

    code = letters[id_str[0]]
    x1, x2 = divmod(code, 10)
    digits = [int(x) for x in id_str[1:]]
    weights = [8, 7, 6, 5, 4, 3, 2, 1, 1]
    total = x1*1 + x2*9 + sum(d*w for d, w in zip(digits, weights))

    if total % 10 != 0:
        return False, "請重新輸入"

    citizenship_num = id_str[2]

    citizenship = "foreigner" if (citizenship_num=="6") else "no citizenship" if (citizenship_num=="7") else "hk/mac" if(citizenship_num=="8") else "china" if (citizenship_num=="9") else "taiwan" 

    return True, f"{id_str} {city} {gender} {citizenship}"



#main
if __name__ == "__main__":
    user_id = input("請輸入身分證字號：")

    valid, result = validate_taiwan_id(user_id, city_map)
    print(result)

    conn.close()
