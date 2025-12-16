import { Router } from "express";
import { createSummary } from "../services/summary.service";

const router = Router();

router.post("/", async (req, res) => {
  const { title, content } = req.body;

  try {
    const response = await fetch("http://localhost:8000/summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error("Summary API error:", error);
    return res.status(500).json({ summary: "요약 생성에 실패했습니다. " });
  }
});

export default router;
