from fastapi import FastAPI
from app.api.summary import router as summary_router

app = FastAPI(title="AI News RAG Engine")

app.include_router(summary_router)