export const CATEGORY_LIST = [
  { id: "economy", name: "경제" },
  { id: "society", name: "사회" },
  { id: "life", name: "생활" },
  { id: "world", name: "세계" },
  { id: "it", name: "IT/과학" },
] as const;

export type CategoryId = (typeof CATEGORY_LIST)[number]["id"];
