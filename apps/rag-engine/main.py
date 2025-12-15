from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="AI News RAG Engine")

class SummaryRequest(BaseModel):
    url: str

@app.post("/summary")
def generate_summary(req: SummaryRequest):
    return {"summary": f"URL 요약 준비됨: {req.url}"}