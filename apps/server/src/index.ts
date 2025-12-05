import express from "express";
import cors from "cors";
import helmet from "helmet";
import newsRouter from "./routes/news";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/news", newsRouter);

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
