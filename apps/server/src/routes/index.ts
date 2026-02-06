import { Router } from "express";

const router = Router();

router.post("/", async (req, res) => {
  const { url, content } = req.body;

  try {
    if (!url || !String(url).trim() || !content || !String(content).trim())
      return res.status(400).json({ error: "url and content are required" });

    const ragUrl = process.env.RAG_URL;

    if (!ragUrl) {
      console.error("RAG_ENGINE_URL is not set");
      return res.status(500).json({ error: "인덱싱 요청에 실패했습니다." });
    }

    const response = await fetch(`${ragUrl}/index`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, content }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("RAG engine error:", response.status, errorText);
      return res.status(500).json({ error: "인덱싱 요청에 실패했습니다." });
    }

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error("Index API error:", error);
    return res.status(500).json({ error: "인덱싱 요청에 실패했습니다." });
  }
});

export default router;
