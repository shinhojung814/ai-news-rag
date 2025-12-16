from fastapi import APIRouter
from pydantic import BaseModel
from app.rag.generator import generate_summary

router = APIRouter()

class SummaryRequest(BaseModel):
    title: str
    content: str

@router.post("/summary")
async def summary(req: SummaryRequest):
    """
    단일 기사 요약 엔드포인트
    """
    summary = generate_summary(req.title, req.content)
    return {"summary": summary}