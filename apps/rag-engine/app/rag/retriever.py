import hashlib
from typing import Any, Dict, List, Optional
from datetime import datetime
from app.rag.chunker import split_text_into_chunks
from app.rag.embedder import embed_texts
from app.rag.vectordb import add_embeddings, query_similar_chunks

def hash_id(text: str) -> str:
    """
    URL 또는 텍스트 기반으로 고유한 ID 생성
    """
    return hashlib.md5(text.encode("utf-8")).hexdigest()

def index_document(url: str, content: str, metadata: Optional[Dict[str, Any]] = None):
    """
    뉴스 기사 본문을 벡터 DB에 저장하는 함수
    Express -> FastAPI 요청 시 최초 1번 호출
    """
    doc_id = hash_id(url)
    chunks = split_text_into_chunks(content)

    if not chunks:
        return {
            "doc_id": doc_id,
            "chunks_stored": 0
        }
    
    # 메타데이터 보강
    meta = dict(metadata or {})

    # 날짜 필터링
    crawled_at = meta.get("crawled_at")

    if crawled_at:
        try:
            crawled_date = str(crawled_at)[:10]
        except Exception:
            crawled_date = datetime.now().date().isoformat()
    else:
        crawled_date = datetime.now().date().isoformat()
        meta["crawled_date"] = datetime.now().isoformat()
    
    meta["crawled_date"] = crawled_date

    embeddings = embed_texts(chunks)

    add_embeddings(doc_id, chunks, embeddings, meta)

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

def retrieve_chunks(query_embedding: List[float], top_k: int = 5, where: Optional[Dict[str, Any]] = None) -> List[str]:
    """
    이미 임베딩된 query로 유사 chunk를 검색
    """
    return query_similar_chunks(query_embedding, top_k, where=where)
