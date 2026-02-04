from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.rag.retriever import index_document

router = APIRouter()

class IndexRequest(BaseModel):
    url: str
    content: str


@router.post("/index")
async def index(req: IndexRequest):
    url = req.url.strip()
    content = req.content.strip()

    if not url or not content:
        raise HTTPException(status_code=400, detail="url and content are required")
    
    return index_document(url, content)
