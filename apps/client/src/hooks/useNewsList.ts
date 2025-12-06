import { useQuery } from "@tanstack/react-query";
import { getNewsList } from "../api/news";
import type { News } from "../types/news";

export const useNewsList = (category: string) => {
  return useQuery<News[]>({
    queryKey: ["news", category],
    queryFn: () => getNewsList(category),
  });
};
