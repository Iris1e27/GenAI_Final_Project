from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.internal.database_utils import init_db
from app.routers import users, papers, documents

# Initialize the database
init_db()

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from this origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)


app.include_router(users.router, prefix="/users")
app.include_router(papers.router, prefix="/papers")
app.include_router(documents.router, prefix="/documents")