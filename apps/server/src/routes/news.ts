import { Router } from "express";
import { fetchNewsList, fetchNewsDetail } from "../services/news.service";
import { indexNewsDocument, IndexPayload } from "../services/index.service";

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
    const category = (req.query.category as string) || undefined;

    if (!url) {
      return res.status(400).json({ error: "url is required" });
    }

    const detail = await fetchNewsDetail(url);

    const payload: IndexPayload = {
      url: detail.url,
      content: detail.content,
    };

    if (detail.title) payload.title = detail.title;
    if (detail.press) payload.press = detail.press;
    if (category) payload.category = category;
    payload.crawledAt = new Date().toISOString();

    if (detail.content) {
      indexNewsDocument(payload).catch((error) => {
        console.error("RAG index error:", error);
      });
    }

    res.json(detail);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news detail" });
  }
});

export default router;
