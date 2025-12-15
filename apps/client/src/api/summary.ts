export async function generateSummary(
  url: string
): Promise<{ summary: string }> {
  const res = await fetch("/api/summary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  if (!res.ok) {
    throw new Error("Failed to generate summary");
  }

  return res.json();
}
