import { Router } from "express";
import { createSummary } from "../services/summary.service";

const router = Router();

router.post("/", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  // TODO: RAG 엔진 연결 전 임시 요약
  const summary = await createSummary(url);

  return res.json({ summary });
});

export default router;
