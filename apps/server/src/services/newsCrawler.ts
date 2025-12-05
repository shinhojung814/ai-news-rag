import axios from "axios";
import * as cheerio from "cheerio";

export async function fetchNewsList(category: string) {
  const url = `https://news.naver.com/section/${category}`;

  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const articles: any[] = [];

  $("li.sa_item").each((_, el) => {
    const title = $(el).find(".sa_text_title").text().trim();
    const press = $(el).find(".sa_text_press").text().trim();
    const href = $(el).find("a").attr("href");
    const thumbnail = $(el).find("img").attr("data-src") || null;

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

  const title = $("#title_area .title").text().trim();
  const content = $("#dic_area").text().trim();
  const press = $(".media_end_head_top_logo img").attr("alt");

  return {
    title,
    content,
    press,
    url,
  };
}
