from fastapi import APIRouter
from pydantic import BaseModel
from app.rag.qa import answer_question

router = APIRouter()

class QARequest(BaseModel):
    question: str

class QAResponse(BaseModel):
    answer: str

@router.post("/qa", response_model=QAResponse)
async def qa(req: QARequest):
    answer = answer_question(req.question)
    return {"answer": answer}