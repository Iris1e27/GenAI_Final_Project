from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.internal.database_utils import init_db
from app.routers import users, papers, documents, bibs
import os

# Initialize the database
init_db()

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(users.router, prefix="/users")
app.include_router(papers.router, prefix="/papers")
app.include_router(documents.router, prefix="/documents")
app.include_router(bibs.router, prefix="/bibs")

# 假设图片存储在服务器的'./images'目录
app.mount("/images", StaticFiles(directory="images"), name="images")

