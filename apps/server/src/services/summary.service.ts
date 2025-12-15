import axios from "axios";

export async function createSummary(url: string): Promise<string> {
  const res = await axios.post("http://localhost:8000/summary", { url });
  return res.data.summary;
}
