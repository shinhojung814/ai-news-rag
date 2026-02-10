from typing import Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.rag.retriever import index_document

router = APIRouter()

class IndexRequest(BaseModel):
    url: str
    content: str
    title: Optional[str] = None,
    press: Optional[str] = None,
    category: Optional[str] = None,
    crawled_at: Optional[str] = None


@router.post("/index")
async def index(req: IndexRequest):
    url = req.url.strip()
    content = req.content.strip()

    if not url or not content:
        raise HTTPException(status_code=400, detail="url and content are required")
    
    metadata = {
        "title": req.title,
        "press": req.press,
        "category": req.category,
        "crawled_at": req.crawled_at,
    }

    metadata = {k: v for k, v in metadata.items() if v is not None}
    
    return index_document(url, content, metadata)