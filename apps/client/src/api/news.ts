export async function getNewsList(category: string) {
  const res = await fetch(`/api/news?category=${category}`);
  if (!res.ok) throw new Error("Failed to fetch news list");
  return res.json();
}

export async function getNewsDetail(url: string) {
  const res = await fetch(`/api/news/detail?url=${encodeURIComponent(url)}`);
  if (!res.ok) throw new Error("Failed to fetch news detail");
  return res.json();
}
