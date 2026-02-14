import axios from "axios";
import iconv from "iconv-lite";
import * as cheerio from "cheerio";

const DEFAULT_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
  "Accept-Language": "ko-KR,ko;q=0.9,en;q=0.8",
};

const SID1: Record<string, string> = {
  politics: "100",
  economy: "101",
  society: "102",
  life: "103",
  culture: "103",
  world: "104",
  it: "105",
  science: "105",
};

async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 5,
  baseDelay = 3000,
) {
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (err: any) {
      attempt += 1;
      const msg = String(err?.message || "");
      const is429 = msg.includes("429");
      if (!is429 || attempt > retries) throw err;
      const wait = baseDelay * Math.pow(2, attempt - 1);
      await new Promise((r) => setTimeout(r, wait));
    }
  }
}

export async function fetchNewsList(category: string) {
  const sid1 = SID1[category];

  if (!sid1) {
    throw new Error(`Invalid category: ${category}`);
  }

  const url = `https://news.naver.com/main/list.naver?mode=LSD&mid=sec&sid1=${sid1}`;

  const { data } = await axios.get(url, { responseType: "arraybuffer" });
  const decoded = iconv.decode(Buffer.from(data), "euc-kr");
  const $ = cheerio.load(decoded);

  const articles: any[] = [];

  $(".type06_headline li, .type06 li").each((_, el) => {
    const title = $(el).find("a").last().text().trim();
    const press = $(el).find(".writing").text().trim();
    const href = $(el).find("a").last().attr("href");
    const thumbnail =
      $(el).find("img").attr("src") ||
      $(el).find("img").attr("data-src") ||
      null;

    if (title && href) {
      articles.push({
        title,
        press,
        url: href,
        thumbnail,
      });
    }
  });

  return articles;
}

export async function fetchNewsDetail(url: string) {
  const { data } = await withRetry(() =>
    axios.get(url, { headers: DEFAULT_HEADERS, timeout: 20000 }),
  );

  const $ = cheerio.load(data);

  const title =
    $("#title_area .title").text().trim() ||
    $("h2#title_area").text().trim() ||
    $("h2.media_end_head_headline").text().trim() ||
    $("h1").first().text().trim();

  const content =
    $("#dic_area").text().trim() || $("#newsct_article").text().trim();

  const press =
    $(".media_end_head_top_logo img").attr("alt") ||
    $(".media_end_head_top_logo").text().trim();

  return { url, title, content, press };
}
