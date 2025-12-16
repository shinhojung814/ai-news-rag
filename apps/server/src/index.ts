import express from "express";
import cors from "cors";
import helmet from "helmet";

import newRouter from "./routes/news";
import summaryRouter from "./routes/summary";

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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
