import hashlib
from typing import List
from app.rag.chunker import split_text_into_chunks
from app.rag.embedder import embed_texts
from app.rag.vectordb import add_embeddings, query_similar_chunks

def hash_id(text: str) -> str:
    """
    URL 또는 텍스트 기반으로 고유한 ID 생성
    """
    return hashlib.md5(text.encode("utf-8")).hexdigest()

def index_document(url: str, content: str):
    """
    뉴스 기사 본문을 벡터 DB에 저장하는 함수
    Express -> FastAPI 요청 시 최초 1번 호출
    """
    doc_id = hash_id(url)
    chunks = split_text_into_chunks(content)

    embeddings = embed_texts(chunks)

    add_embeddings(doc_id, chunks, embeddings)

    return {
        "doc_id": doc_id,
        "chunks_stored": len(chunks)
    }

def retrieve_context(query: str, top_k: int = 5) -> List[str]:
    """
    요약할 때 user query를 임베딩한 후
    관련 top_k chunk를 검색하여 프롬프트에 전달
    """
    query_embedding = embed_texts([query])[0]

    top_chunks = query_similar_chunks(query_embedding, top_k)

    return top_chunks

def retrieve_chunks(query_embedding: List[float], top_k: int = 5) -> List[str]:
    """
    이미 임베딩된 query로 유사 chunk를 검색
    """
    return query_similar_chunks(query_embedding, top_k)
