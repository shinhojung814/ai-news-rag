export const CATEGORY_LIST = [
  { id: "101", name: "경제" },
  { id: "102", name: "사회" },
  { id: "103", name: "생활" },
  { id: "104", name: "세계" },
  { id: "105", name: "IT/과학" },
] as const;

export type CategoryId = (typeof CATEGORY_LIST)[number]["id"];
