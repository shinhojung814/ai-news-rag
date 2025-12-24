import { useMutation } from "@tanstack/react-query";
import { askQuestion } from "../api/qa";

export const useQA = () => {
  return useMutation({
    mutationFn: (question: string) => askQuestion(question),
  });
};
