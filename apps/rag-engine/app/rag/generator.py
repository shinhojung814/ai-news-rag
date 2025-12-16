import os
from dotenv import load_dotenv
from typing import List
from openai import OpenAI

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

MODEL_NAME = "gpt-4.1-mini"

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

        == 요약 시작 ==
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

    return response.choices[0].message["content"]