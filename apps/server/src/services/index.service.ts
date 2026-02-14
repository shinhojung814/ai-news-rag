export interface IndexPayload {
  url: string;
  content: string;
  title?: string;
  press?: string;
  category?: string;
  crawled_at?: string;
}

export async function indexNewsDocument(payload: IndexPayload) {
  const ragUrl = process.env.RAG_ENGINE_URL;

  if (!ragUrl) {
    throw new Error("RAG_ENGINE_URL is not set");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45000);

  const response = await fetch(`${ragUrl}/index`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: controller.signal,
  });

  clearTimeout(timeout);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`RAG engine error: ${response.status} ${errorText}`);
  }

  return response.json();
}
