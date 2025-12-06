import { useQuery } from "@tanstack/react-query";
import { getNewsDetail } from "../api/news";
import type { NewsDetail } from "../types/news";

export const useNewsDetail = (url: string) => {
  return useQuery<NewsDetail>({
    queryKey: ["news-detail", url],
    queryFn: () => getNewsDetail(url),
    enabled: !!url,
  });
};
