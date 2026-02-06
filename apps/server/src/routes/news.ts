import { Router } from "express";
import { fetchNewsList, fetchNewsDetail } from "../services/news.service";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const category = req.query.category as string;
    if (!category) {
      return res.status(400).json({ error: "category is required" });
    }

    const list = await fetchNewsList(category);
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news list" });
  }
});

router.get("/detail", async (req, res) => {
  try {
    const url = req.query.url as string;
    if (!url) {
      return res.status(400).json({ error: "url is required" });
    }

    const detail = await fetchNewsDetail(url);

    const ragUrl = process.env.RAG_ENGINE_URL;

    if (ragUrl && detail.content) {
      fetch(`${ragUrl}/index`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: detail.url, content: detail.content }),
      }).catch((error) => {
        console.error("RAG index error:", error);
      });
    }
    res.json(detail);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news detail" });
  }
});

export default router;
