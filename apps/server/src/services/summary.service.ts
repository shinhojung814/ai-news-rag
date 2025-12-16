import axios from "axios";

const RAG_URL = process.env.RAG_ENGINE_URL;

export async function createSummary(url: string): Promise<string> {
  const res = await axios.post(`${RAG_URL}/summary`, { url });
  return res.data.summary;
}
