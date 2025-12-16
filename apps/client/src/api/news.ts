const BASE_URL = import.meta.env.VITE_API_SERVER_URL;

export async function getNewsList(category: string) {
  const res = await fetch(`${BASE_URL}/api/news?category=${category}`);
  if (!res.ok) throw new Error("Failed to fetch news list");
  return res.json();
}

export async function getNewsDetail(url: string) {
  const res = await fetch(
    `${BASE_URL}/api/news/detail?url=${encodeURIComponent(url)}`
  );
  if (!res.ok) throw new Error("Failed to fetch news detail");
  return res.json();
}
