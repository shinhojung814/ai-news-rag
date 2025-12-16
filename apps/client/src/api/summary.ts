export async function generateSummary(payload: {
  title: string;
  content: string;
}): Promise<{ summary: string }> {
  const res = await fetch("/api/summary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to generate summary");
  }

  return res.json();
}
