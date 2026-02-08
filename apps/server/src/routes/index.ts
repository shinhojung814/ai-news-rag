import { Router } from "express";
import { indexNewsDocument } from "../services/index.service";

const router = Router();

router.post("/", async (req, res) => {
  const { url, content } = req.body;

  try {
    if (!url || !String(url).trim() || !content || !String(content).trim()) {
      return res.status(400).json({ error: "url and content are required" });
    }

    const data = await indexNewsDocument({
      url: String(url).trim(),
      content: String(content).trim(),
    });

    return res.json(data);
  } catch (error) {
    console.error("Index API error:", error);
    return res.status(500).json({ error: "인덱싱 요청에 실패했습니다." });
  }
});

export default router;
