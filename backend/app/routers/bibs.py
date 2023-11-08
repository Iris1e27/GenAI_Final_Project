from fastapi import APIRouter, UploadFile, File, HTTPException
from app.internal.bib_database_utils import BibDatabaseUtils
from app.services.paper_processing import get_summary_by_entry, get_chart_by_entries, get_comparison_by_entries
from starlette.responses import FileResponse
from typing import List

router = APIRouter()
db_utils = BibDatabaseUtils()

@router.post("/upload")
async def upload_bib_file(file: UploadFile = File(...)):
    content = await file.read()
    entries = db_utils.parse_bibtex(content.decode("utf-8"))
    for entry in entries:
        db_utils.add_entry_to_db(entry)
    return {"message": "Entries upload successfully", "bibs": db_utils.get_all_entries()}

@router.get("/list/all")
def list_all_entries():
    return db_utils.get_all_entries()

@router.get("/list/{ID}")
def list_single_entry(ID: str):
    result = db_utils.get_entry_by_id(ID)
    if not result:
        raise HTTPException(status_code=404, detail="Entry not found")
    return result[0]

@router.get("/read/{ID}")
def read_bib_entry(ID: str):
    entry = db_utils.get_entry_by_id(ID)
    if not entry:
        raise HTTPException(status_code=404, detail="BibTeX entry not found")
    # 假设每个条目都有一个'url'字段，存储相关文档的URL
    url = entry[0].get('url')
    if not url:
        raise HTTPException(status_code=404, detail="URL for the BibTeX entry not found")
    return {"url": url}

@router.delete("/delete/{ID}")
def delete_entry(ID: str):
    if db_utils.delete_entry_by_id(ID):
        return {"message": "Entry deleted successfully", "bibs": db_utils.get_all_entries()}
    else:
        raise HTTPException(status_code=404, detail="Entry not found or could not be deleted")
    
@router.get("/summary/{ID}")
def get_a_summary(ID: str):
    entry = db_utils.get_entry_by_id(ID)
    print(type(entry[0]))
    if not entry:
        raise HTTPException(status_code=404, detail="BibTeX entry not found")
    response = get_summary_by_entry(entry[0])
    return {"message": "Summary generated successfully", "summary": response}

@router.post("/generate_chart")
async def generate_chart(data: dict):
    # 从前端传入的数据中获取需要比较的 paper 的 ID
    paper_ids = data.get("paper_ids", [])
    print("paper_ids:"+str(paper_ids))
    
    # 这里可以编写生成图表的代码，使用 paper_ids 做数据查询或分析
    entries = []
    for paper_id in paper_ids:
        entry = db_utils.get_entry_by_id(paper_id)
        if entry:
            entries.append(entry[0])  # 获取到的结果是列表，我们只取第一个元素
    
    # 在这里编写生成图表的代码，使用 entries 做数据查询或分析
    image_url = get_chart_by_entries(entries)
    
    # 返回图表数据，这里返回一个示例响应
    return FileResponse(image_url, media_type="image/png")

@router.post("/compare_paper")
async def compare_paper(data: dict):
    # 从前端传入的数据中获取需要比较的 paper 的 ID
    paper_ids = data.get("paper_ids", [])
    print("paper_ids:"+str(paper_ids))
    
    # 这里可以编写比较 paper 的逻辑，使用 paper_ids 做数据查询或分析
    entries = []
    for paper_id in paper_ids:
        entry = db_utils.get_entry_by_id(paper_id)
        if entry:
            entries.append(entry[0])  # 获取到的结果是列表，我们只取第一个元素
            
    result = get_comparison_by_entries(entries)
    
    # 返回比较结果，这里返回一个示例响应
    return {"message": "Comparison completed successfully", "paper_ids": paper_ids, "result": result}