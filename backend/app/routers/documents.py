from fastapi import APIRouter
from starlette.responses import PlainTextResponse
import os

router = APIRouter()

DOCS_DIRECTORY = "documents"

@router.get("/read/{doc_name}")
async def get_document(doc_name: str):
    file_path = os.path.join(DOCS_DIRECTORY, doc_name)
    if os.path.exists(file_path):
        with open(file_path, 'r') as file:
            content = file.read()
            return PlainTextResponse(content)
    else:
        return {"error": "Document not found"}
