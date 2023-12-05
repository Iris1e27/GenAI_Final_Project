import bibtexparser
from tinydb import TinyDB, Query

DATABASE = "mybibdb.json"

class BibDatabaseUtils:
    def __init__(self, db_path=DATABASE):
        self.db = TinyDB(db_path)

    def parse_bibtex(self, bibtex_string):
        bib_database = bibtexparser.loads(bibtex_string)
        entries = bib_database.entries

        for entry in entries:
            if 'title' in entry:
                entry['title'] = self.remove_braces(entry['title'])

        return entries

    def remove_braces(self, title):
        # 移除标题中的所有大括号
        return title.replace("{", "").replace("}", "")
    
    def add_entry_to_db(self, entry):
        # 检查数据库中是否已经存在具有相同ID的条目
        Entry = Query()
        existing_entry = self.db.get(Entry.ID == entry['ID'])
        
        if existing_entry is None:
            # 如果不存在相同ID的条目，才添加到数据库中
            self.db.insert(entry)
            return True  # 添加成功
        else:
            return False  # 条目已存在，添加失败

    def get_all_entries(self):
        return self.db.all()

    def get_entry_by_citation_key(self, citation_key):
        Entry = Query()
        return self.db.search(Entry.ID == citation_key)
    
    def delete_entry_by_citation_key(self, citation_key):
        Entry = Query()
        deleted_count = self.db.remove(Entry.ID == citation_key)
        return deleted_count > 0
    
    def get_entry_by_id(self, ID):
        Entry = Query()
        return self.db.search(Entry.ID == ID)
    
    def delete_entry_by_id(self, ID):
        Entry = Query()
        deleted_count = len(self.db.remove(Entry.ID == ID))
        return deleted_count > 0
    
    def delete_all_entries(self):
        try:
            self.db.truncate()
            print(f"trucate ok")
            return True
        except Exception as e:
            print(f"Error occurred: {e}")
            return False


# 示例使用
if __name__ == "__main__":
    # 初始化工具类
    db_utils = BibDatabaseUtils()

    # 示例 BibTeX 字符串
    bibtex_string = """
    @article{example,
        author = {Doe, John},
        title = {Example Title},
        journal = {Journal of Examples},
        year = {2023},
        volume = {42},
        pages = {123-456}
    }
    """

    # 解析 BibTeX 并存储
    entries = db_utils.parse_bibtex(bibtex_string)
    for entry in entries:
        db_utils.add_entry_to_db(entry)
