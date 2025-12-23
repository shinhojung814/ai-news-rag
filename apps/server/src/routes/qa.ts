import { Router } from "express";

const router = Router();
const RAG_URL = process.env.RAG_ENGINE_URL;

router.post("/", async (req, res) => {
  const { question } = req.body;

  try {
    const response = await fetch(`${RAG_URL}/qa`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const data = await response.json();
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ answer: "질문에 대한 답변을 생성하지 못했습니다." });
  }
});

export default router;
