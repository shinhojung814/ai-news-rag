import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import newRouter from "./routes/news";
import summaryRouter from "./routes/summary";
import qaRouter from "./routes/qa";

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

const app = express();

const PORT = Number(process.env.PORT) || 3001;

const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-news-rag-client.vercel.app",
];

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS not allowed"));
    },
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/news", newRouter);
app.use("/api/summary", summaryRouter);
app.use("/api/qa", qaRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
