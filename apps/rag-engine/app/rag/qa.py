from datetime import datetime
from app.rag.embedder import embed_text
from app.rag.retriever import retrieve_chunks
from app.rag.generator import generate_answer

CATEGORY_KEYWORDS = {
    "사회": "society",
    "경제": "economy",
    "정치": "politics",
    "세계": "world",
    "생활": "life",
    "문화": "culture",
    "IT": "it",
    "과학": "science",
}

def _infer_filters(question: str):
    clauses = []

    if "오늘" in question:
        clauses.append({"crawled_date": datetime.now().date().isoformat()})

    for k, v in CATEGORY_KEYWORDS.items():
        if k in question:
            clauses.append({"category": v})
            break

    if not clauses:
        return None
    
    if len(clauses) == 1:
        return clauses[0]
    
    return {"$and": clauses}

def answer_question(question: str) -> str:
    # 1. 질문 임베딩
    query_embedding = embed_text(question)

    # 2. 관련 뉴스 chunk 검색
    filters = _infer_filters(question)
    result = retrieve_chunks(query_embedding, top_k=5, where=filters)
    chunks = result["documents"]
    metas = result["metadatas"]

    if not chunks and filters:
        result = retrieve_chunks(query_embedding, top_k=5)
        chunks = result["documents"]
        metas = result["metadatas"]

    # 3. 답변 생성
    if not chunks:
        return "관련된 뉴스 정보를 찾지 못했습니다. 다른 질문을 시도해주세요."
    
    # 4. metas -> sources 구성
    sources = []
    seen = set()
    for m in metas:
        if not m:
            continue
        key = (m.get("title"), m.get("crawled_date"), m.get("url"))
        if key in seen:
            continue
        seen.add(key)
        sources.append({
            "title": m.get("title"),
            "url": m.get("url"),
            "crawled_date": m.get("crawled_date"),
            "category": m.get("category"),
        })

    answer = generate_answer(question, chunks, sources)

    return answer