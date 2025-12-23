import { Router } from "express";

const router = Router();

const RAG_URL = process.env.RAG_ENGINE_URL;

router.post("/", async (req, res) => {
  const { title, content } = req.body;

  try {
    const response = await fetch(`${RAG_URL}/summary`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("RAG engine error:", response.status, errorText);

      return res.status(500).json({
        summary: "요약 생성에 실패했습니다.",
      });
    }

    const data = await response.json();

    return res.json(data);
  } catch (error) {
    console.error("Summary API error:", error);
    return res.status(500).json({ summary: "요약 생성에 실패했습니다." });
  }
});

export default router;
