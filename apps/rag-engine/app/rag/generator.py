import os
from dotenv import load_dotenv
from datetime import datetime
from typing import List
from openai import OpenAI

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

MODEL_NAME = "gpt-4.1-mini"

def _format_source_line(source: dict) -> str:
    title = source.get("title") or "기사 제목 미상"
    url = source.get("url") or ""
    date_str = source.get("crawled_date")

    if date_str:
        try:
            dt = datetime.strptime(date_str, "%Y-%m-%d")
            dow = ["월요일","화요일","수요일","목요일","금요일","토요일","일요일"][dt.weekday()]
            date_kor = f"{dt.year}년 {dt.month}월 {dt.day}일 {dow}"
        except Exception:
            date_kor = date_str
    else:
        date_kor = "날짜 미상"

    if url:
        return f"{date_kor} 기사 \"{title}\"에 따르면({url}),"
    return f"{date_kor} 기사 \"{title}\"에 따르면,"

def build_prompt(title: str, chunks: List[str]) -> str:
    """
    RAG 요약에 사용할 프롬프트 생성
    - 제목 + 관련 문단을 모두 context로 제공
    - 사용자가 원하는 '요약' 출력 지시 포함
    - 3개의 핵심 내용 + bullet point 세부 내용 형태로 요약하도록 지시
    """
    context_text = "\n\n".join(chunks)

    return f"""
        당신은 한국 뉴스 기사를 명확하고 정확하게 요약하는 AI입니다.

        [기사 제목]
        {title}

        [관련 문단]
        {context_text}

        [요약 지시사항]
        - 전체 기사를 3개의 핵심 내용으로 구조화해 요약하세요.
        - 각 핵심 내용 아래에 2~3개의 bullet point로 세부 내용을 정리하세요.
        - 수치, 사실, 근거 등은 가능한 그대로 유지하세요.
        - 기자의 개인 의견, 추측성 문장은 제거하세요.
        - 새로운 정보를 생성하거나 과도한 요약을 하지 마세요.
        - 한국어로 작성하세요.

        [요약 출력 형식]
        1) 핵심 내용 1
        - 세부 내용 1
        - 세부 내용 2

        2) 핵심 내용 2
        - 세부 내용 1
        - 세부 내용 2

        3) 핵심 내용 3
        - 세부 내용 1
        - 세부 내용 2
    """

def generate_summary(title: str, retrieved_chunks: List[str]) -> str:
    """
    RAG 기반 요약 생성기
    1. 받은 chunk들로 프롬프트 작성
    2. OpenAI GPT 모델로 요약 생성
    """
    prompt = build_prompt(title, retrieved_chunks)

    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {"role": "system", "content": "You are a helpful assistant summarizing news."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.2
    )

    return response.choices[0].message.content

def generate_answer(question: str, chunks: list[str], sources: list[dict]) -> str:
    context = "\n\n".join(chunks)
    source_line = _format_source_line(sources[0]) if sources else "기사에 따르면,"

    prompt = f"""
당신은 뉴스 기사 기반 질문에 답하는 AI입니다.
아래 기사 문단을 근거로 질문에 답하세요.

[기사 문단]
{context}

[질문]
{question}

[답변 지시]
- 첫 문장은 반드시 다음 형식으로 시작하세요:
  "{source_line}"
- 근거가 되는 기사 정보를 생략하지 마세요.
- 기사에 없는 추론/가정은 하지 마세요.
- 한국어로 답하세요.

[답변]
"""
    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {"role": "system", "content": "You answer questions based on news."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.2
    )

    return response.choices[0].message.content.strip()