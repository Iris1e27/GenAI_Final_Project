import os
from fastapi import APIRouter, UploadFile, File
from starlette.responses import FileResponse
from ..internal import database_utils  # 导入数据库工具


router = APIRouter()

UPLOAD_DIRECTORY = "uploaded_files"

if not os.path.exists(UPLOAD_DIRECTORY):
    os.makedirs(UPLOAD_DIRECTORY)

@router.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    file_location = os.path.join(UPLOAD_DIRECTORY, file.filename)
    with open(file_location, "wb+") as file_object:
        file_object.write(file.file.read())
    database_utils.save_path_to_db(file_location)  # 使用数据库函数保存路径
    return {"filename": file.filename, "location": file_location}

@router.get("/list/")
async def list_papers():
    """获取所有上传的论文文件名"""
    files = os.listdir(UPLOAD_DIRECTORY)
    return files

@router.get("/read/{paper_name}")
async def get_paper(paper_name: str):
    """
    获取指定名称的论文文件。
    """
    file_path = os.path.join(UPLOAD_DIRECTORY, paper_name)
    
    # 检查文件是否存在
    if not os.path.exists(file_path):
        return {"error": "File not found"}
    
    return FileResponse(file_path, media_type="application/pdf", filename=paper_name)


@router.get("/summary/{paper_name}")
async def get_summary(paper_name: str):
    """
    获取指定名称的论文摘要。
    这只是一个简化的示例，实际上您可能需要使用某种NLP库或服务来生成摘要。
    """
    # 为简化，只返回一个假的摘要
    return {"summary": f"Summary for {paper_name}"}


@router.post("/chart/")
async def generate_chart(paper_names: list[str]):
    """
    为指定的论文生成图表。
    这只是一个简化的示例，实际上您可能需要使用某种数据可视化库来生成图表。
    """
    # 为简化，只返回一个假的图表数据
    chart_data = {"papers": paper_names, "data": [len(name) for name in paper_names]}
    return chart_data


@router.post("/compare/")
async def compare_papers(paper_names: list[str]):
    """
    比较指定的论文并返回比较结果。
    这只是一个简化的示例，实际上您可能需要使用某种文本对比库或算法来进行比较。
    """
    # 为简化，只返回一个假的比较结果
    comparison_result = f"Comparison result for {', '.join(paper_names)}"
    return {"result": comparison_result}