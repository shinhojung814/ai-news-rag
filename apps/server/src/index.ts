import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server OK");
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
