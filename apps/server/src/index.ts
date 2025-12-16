import express from "express";
import cors from "cors";
import helmet from "helmet";

import newRouter from "./routes/news";
import summaryRouter from "./routes/summary";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/news", newRouter);
app.use("/api/summary", summaryRouter);

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
