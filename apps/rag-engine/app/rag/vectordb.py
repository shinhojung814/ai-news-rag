import chromadb
from typing import Any, Dict, List, Optional

# persistent DB로 저장
chroma_client = chromadb.PersistentClient(path="./chroma_db")

COLLECTION_NAME = "news_chunks"

def get_collection():
    """
    컬렉션 생성 또는 불러오기
    """
    return chroma_client.get_or_create_collection(
        name=COLLECTION_NAME,
        metadata={"hnsw:space": "cosine"}
    )

def add_embeddings(
    doc_id: str,
    chunks: List[str],
    embeddings: List[List[float]],
    metadata: Optional[Dict[str, Any]] = None
):
    """
    기사 1개에 대한 chunk + embedding을 DB에 저장
    doc_id: 뉴스 URL 해시 등 고유한 ID
    """
    collection = get_collection()

    ids = [f"{doc_id}_{i}" for i in range(len(chunks))]

    base_meta = {"doc_id": doc_id}

    if metadata:
        base_meta.update(metadata)

    collection.add(
        ids=ids,
        documents=chunks,
        embeddings=embeddings,
        metadatas=[base_meta for _ in chunks]
    )

def query_similar_chunks(
    query_embedding: List[float],
    top_k: int = 5,
    where: Optional[Dict[str, Any]] = None
):
    """
    요약 프롬프트 생성을 위한 유사 chunk 검색
    """
    col = get_collection()

    results = col.query(
        query_embeddings=[query_embedding],
        n_results=top_k,
        where=where
    )

    return results["documents"][0]