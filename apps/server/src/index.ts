import express from "express";
import cors from "cors";
import helmet from "helmet";

import newRouter from "./routes/news";
import summaryRouter from "./routes/summary";

const app = express();

const PORT = Number(process.env.PORT) || 3001;

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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
