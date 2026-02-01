import axios from "axios";

export async function createSummary(url: string): Promise<string> {
  const ragUrl = process.env.RAG_ENGINE_URL;

  if (!ragUrl) {
    throw new Error("RAG_ENGINE_URL is not set");
  }

  const res = await axios.post(`${ragUrl}/summary`, { url });

  return res.data.summary;
}
