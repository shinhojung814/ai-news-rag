import dotenv from "dotenv";
import { fetchNewsDetail, fetchNewsList } from "../src/services/news.service";
import { indexNewsDocument, IndexPayload } from "../src/services/index.service";

const env =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

dotenv.config({ path: env });

const CATEGORIES = [
  "economy",
  "society",
  "politics",
  "world",
  "life",
  "culture",
  "it",
  "science",
];

const LIMIT_PER_CATEGORY = 10;

const seen = new Set<string>();

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 5,
  baseDelay = 3000,
) {
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (error: any) {
      attempt += 1;
      const msg = String(error?.message || "");
      const is429 = msg.includes("429");
      const isTimeout =
        msg.includes("AbortError") ||
        msg.includes("Headers Timeout") ||
        msg.includes("timeout");

      if (attempt > retries || (!is429 && !isTimeout)) {
        throw error;
      }

      const wait = baseDelay * Math.pow(2, attempt - 1);
      await sleep(wait);
    }
  }
}

async function indexCategory(category: string) {
  const list = await fetchNewsList(category);

  const targets = list.slice(0, LIMIT_PER_CATEGORY);

  for (const item of targets) {
    if (!item.url || seen.has(item.url)) continue;
    seen.add(item.url);

    const detail = await fetchNewsDetail(item.url);

    if (!detail.content) continue;

    const payload: IndexPayload = {
      url: detail.url,
      content: detail.content,
      title: detail.title,
      category,
      crawled_at: new Date().toISOString(),
    };

    if (detail.press) payload.press = detail.press;

    try {
      await withRetry(() => indexNewsDocument(payload), 5, 3000);
      console.log(`[indexed] ${category} | ${detail.title} | ${detail.url}`);
    } catch (e) {
      console.warn(`[skip] index failed: ${detail.url}`);
    }

    await sleep(2000);
  }
}

async function main() {
  for (const category of CATEGORIES) {
    console.log(`Indexing category: ${category}`);
    await indexCategory(category);
    await sleep(1000);
  }
  console.log("batch indexing completed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
