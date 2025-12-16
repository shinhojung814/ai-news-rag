🌐 AI News RAG

이 프로젝트는 뉴스 기사를 실시간으로 수집하고,
RAG(Retrieval-Augmented Generation)를 활용해 핵심 요약을 생성하는 풀스택 애플리케이션입니다.

Monorepo(Yarn Workspaces + Vite + Express + FastAPI) 기반 구조로 구성되며,
향후 뉴스 기반 AI Q&A 기능을 확장할 수 있도록 설계되었습니다.

📁 폴더 구조
```
ai-news-rag
├─ apps
│  ├─ client         # React + Vite 프론트엔드 (뉴스 목록, 상세, 요약 UI)
│  ├─ server         # Express 백엔드 (크롤링 API, 요약 요청 중계)
│  └─ rag-engine     # FastAPI 기반 RAG 엔진 (chunking, embedder, generator)
├─ package.json      # Yarn Workspaces 설정
└─ README.md
```

🛠 기술 스택
Frontend

React 19

Vite

React Router

TanStack Query

Tailwind CSS

TypeScript

Backend

Express.js (Node.js)

Cheerio (뉴스 크롤링)

Axios

Helmet + CORS

RAG Engine

FastAPI

OpenAI Embeddings / GPT-4.1 mini

Chunker / Generator 모듈 구조

(2차 개발 예정) Vector DB + Retriever

⚙️ 실행 방법
1. 레포 클론
git clone https://github.com/your/repo.git
cd ai-news-rag

2. 패키지 설치
yarn

3. 환경 변수 설정
📌 apps/server/.env
RAG_ENGINE_URL=http://localhost:8000

📌 apps/rag-engine/.env
OPENAI_API_KEY=your_api_key_here

📌 apps/client/.env
VITE_API_SERVER_URL=http://localhost:3001

4. 개발 서버 실행
yarn dev

실행 주소

Client → http://localhost:5173

Server → http://localhost:3001

RAG Engine → http://localhost:8000
