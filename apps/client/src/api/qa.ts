export interface QAResponse {
  answer: string;
}

export async function askQuestion(question: string): Promise<QAResponse> {
  const res = await fetch("/api/qa", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to get answer");
  }

  return res.json();
}
