import os
from dotenv import load_dotenv
from typing import List
from openai import OpenAI

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

EMBEDDING_MODEL = "text-embedding-3-small"

def embed_texts(texts: List[str]) -> List[List[float]]:
    """
    여러 개의 chunk를 임베딩하여 벡터 리스트로 반환
    """
    if not texts:
        return []
    
    # embedding API에 chunk 리스트를 넣어 요청 -> 각 chunk에 대해 embedding 벡터를 생성
    response = client.embeddings.create(
        model=EMBEDDING_MODEL,
        input=texts
    )

    # embedding을 추출해 리스트로 반환
    embeddings = [item.embedding for item in response.data]
    return embeddings