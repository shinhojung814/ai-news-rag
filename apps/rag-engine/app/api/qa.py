from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.rag.qa import answer_question

router = APIRouter()

class QARequest(BaseModel):
    question: str

class QAResponse(BaseModel):
    answer: str

@router.post("/qa", response_model=QAResponse)
async def qa(req: QARequest):
    question = req.restion.strip()
    if not question:
        raise HTTPException(status_code=400, detail="question is required")
    
    answer = answer_question(question)
    return { "answer": answer}