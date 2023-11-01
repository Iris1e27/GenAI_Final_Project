import sqlite3

DATABASE = "mydb.sqlite"

def init_db():
    """初始化数据库并创建表"""
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute('''CREATE TABLE IF NOT EXISTS files (path TEXT)''')
        conn.commit()

def save_path_to_db(file_location):
    """保存文件路径到数据库"""
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute("INSERT INTO files (path) VALUES (?)", (file_location,))
        conn.commit()
