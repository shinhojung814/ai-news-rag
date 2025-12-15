```
apps/rag-engine
├─ main.py              # FastAPI 엔트리
└─ app
   ├─ __init__.py
   ├─ api
   │  ├─ __init__.py
   │  └─ summary.py     # /summary 라우트
   ├─ core
   │  ├─ __init__.py
   │  └─ config.py      # 설정, 환경변수
   └─ rag
      ├─ __init__.py
      ├─ chunker.py     # 텍스트 쪼개기
      ├─ embedder.py    # 임베딩 생성
      └─ retriever.py   # 관련 chunk 검색
```
