import { useMutation } from "@tanstack/react-query";
import { generateSummary } from "../api/summary";

export const useSummary = () => {
  return useMutation({
    mutationKey: ["summary"],
    mutationFn: async (url: string) => {
      const data = await generateSummary(url);
      return data.summary;
    },
  });
};
