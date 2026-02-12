import axios from "axios";
import * as cheerio from "cheerio";

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

export async function fetchNewsList(category: string) {
  const sid1 = SID1[category];

  if (!sid1) {
    throw new Error(`Invalid category: ${category}`);
  }

  const url = `https://news.naver.com/main/list.naver?mode=LSD&mid=sec&sid1=${sid1}`;

  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

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
  const { data } = await axios.get(url);
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
