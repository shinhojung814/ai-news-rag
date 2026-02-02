import { Router } from "express";

const router = Router();

router.post("/", async (req, res) => {
  const { question } = req.body;

  try {
    if (!question || !String(question).trim()) {
      return res.status(400).json({ answer: "question is required." });
    }

    const ragUrl = process.env.RAG_ENGINE_URL;
    if (!ragUrl) {
      console.error("RAG_ENGINE_URL is not defined");
      return res.status(500).json({ answer: "답변 생성에 실패했습니다." });
    }

    const response = await fetch(`${ragUrl}/qa`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("RAG engine error:", response.status, errorText);

      return res.status(500).json({ answer: "답변 생성에 실패했습니다." });
    }

    const data = await response.json();
    return res.json(data);
  } catch (e) {
    console.error("QA API error:", e);
    res.status(500).json({ answer: "질문에 대한 답변을 생성하지 못했습니다." });
  }
});

export default router;
