from app.rag.embedder import embed_text
from app.rag.retriever import retrieve_chunks
from app.rag.generator import generate_answer

def answer_question(question:str) -> str:
    # 1. 질문 임베딩
    query_embedding = embed_text(question)

    # 2. 관련 뉴스 chunk 검색
    chunks = retrieve_chunks(query_embedding, top_k=5)

    # 3. 답변 생성
    answer = generate_answer(question, chunks)

    return answer