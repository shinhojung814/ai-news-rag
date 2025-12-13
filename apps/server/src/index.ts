import express from "express";
import cors from "cors";
import helmet from "helmet";
import newsRoutes from "./routes/news";
import summaryRoutes from "./routes/summary";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/news", newsRoutes);
app.use("/api/summary", summaryRoutes);

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
