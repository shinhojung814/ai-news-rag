# AI News RAG

네이버 뉴스 기사 목록/본문을 수집하고, RAG(Retrieval-Augmented Generation)로 기사 요약과 뉴스 기반 Q&A를 제공하는 모노레포 프로젝트입니다.

현재 구현은 단순 요약을 넘어, 기사 인덱싱(ChromaDB), 메타데이터 기반 검색 필터, 채팅형 Q&A UI까지 포함합니다.

## 주요 기능

- 뉴스 목록 조회: 카테고리별 기사 리스트 조회
- 뉴스 상세 조회: 기사 본문/언론사 정보 조회
- 자동 인덱싱: 상세 기사 조회 시 RAG 엔진에 본문 자동 인덱싱
- 기사 요약: 선택 기사에 대해 GPT 기반 구조화 요약 생성
- 뉴스 Q&A: 누적 인덱스 기반 질의응답
- 질의 필터 추론: 질문에 `오늘`, `경제/사회/정치/...` 키워드가 있으면 날짜/카테고리 필터 적용
- UI 텍스트 스트리밍: 요약/답변을 타이핑 애니메이션 형태로 표시

## 아키텍처

```text
apps/client (React + Vite + TanStack Query)
  -> apps/server (Express, 크롤링/중계/인덱싱 트리거)
     -> apps/rag-engine (FastAPI, OpenAI, ChromaDB)
```

## 프로젝트 구조

```text
ai-news-rag
├─ apps
│  ├─ client
│  │  ├─ src/pages
│  │  │  ├─ NewsList.tsx
│  │  │  ├─ NewsDetail.tsx
│  │  │  └─ NewsQA.tsx
│  │  └─ src/hooks/useTextStream.ts
│  ├─ server
│  │  ├─ src/routes (news, summary, qa, index)
│  │  ├─ src/services (news/index/summary)
│  │  └─ scripts/batch_index.ts
│  └─ rag-engine
│     ├─ app/api (index, summary, qa)
│     ├─ app/rag (chunker, embedder, retriever, generator, vectordb, qa)
│     └─ chroma_db (Persistent Vector DB)
├─ package.json
└─ README.md
```

## 기술 스택

- Frontend: React 19, Vite 7, React Router 7, TanStack Query 5, Tailwind CSS
- Server: Express 5, Axios, Cheerio, iconv-lite, Helmet, CORS
- RAG Engine: FastAPI, OpenAI API (`text-embedding-3-small`, `gpt-4.1-mini`), ChromaDB

## API 요약

### Server (`http://localhost:3001`)

- `GET /api/news?category={category}`: 뉴스 목록 조회
- `GET /api/news/detail?url={url}`: 뉴스 상세 조회 + 비동기 인덱싱 트리거
- `POST /api/summary`: 요약 요청을 RAG 엔진으로 전달
- `POST /api/qa`: 질문 요청을 RAG 엔진으로 전달
- `POST /api/index`: 문서 인덱싱 요청 전달

### RAG Engine (`http://localhost:8000`)

- `POST /index`: 문서 chunk/embedding 생성 후 ChromaDB 저장
- `POST /summary`: 기사 요약 생성
- `POST /qa`: 질문 임베딩 + 유사 chunk 검색 + 답변 생성

## 환경 변수

### `apps/client/.env.development`

```env
VITE_API_SERVER_URL=http://localhost:3001
```

### `apps/server/.env.development`

```env
PORT=3001
CLIENT_URL=http://localhost:5173
RAG_ENGINE_URL=http://localhost:8000
```

### `apps/rag-engine/.env`

```env
OPENAI_API_KEY=your_api_key_here
```

## 로컬 실행

1. 의존성 설치

```bash
yarn
```

2. RAG 엔진 Python 가상환경/패키지 설치

```bash
cd apps/rag-engine
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ../..
```

3. 전체 개발 서버 실행

```bash
yarn dev
```

- Client: `http://localhost:5173`
- Server: `http://localhost:3001`
- RAG Engine: `http://localhost:8000`

## 배치 인덱싱

RAG 검색 품질을 위해 카테고리별 최신 기사 일부를 미리 인덱싱할 수 있습니다.

```bash
cd apps/server
yarn tsx scripts/batch_index.ts
```

특징:

- 카테고리별 기사 최대 10건 처리
- 429/타임아웃 대상 지수 백오프 재시도
- 기사별 인덱싱 간 딜레이 적용
