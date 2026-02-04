from fastapi import FastAPI
from app.api.index import router as index_router
from app.api.summary import router as summary_router
from app.api.qa import router as qa_router

app = FastAPI(title="AI News RAG Engine")

app.include_router(index_router)
app.include_router(summary_router)
app.include_router(qa_router)