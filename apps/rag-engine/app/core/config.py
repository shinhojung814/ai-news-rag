import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    openai_api_key: str | None = os.getenv("OPENAI_API_KEY")
    embedding_model: str = "text-embedding-3-small"

settings = Settings()