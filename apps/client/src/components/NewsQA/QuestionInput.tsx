import { useState } from "react";
import Button from "../shared/Button";

interface QuestionInputProps {
  onSubmit: (question: string) => void;
  isLoading: boolean;
}

const QuestionInput = ({ onSubmit, isLoading }: QuestionInputProps) => {
  const [question, setQuestion] = useState("");
  const isSubmitDisabled = isLoading || !question.trim();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isSubmitDisabled) return;

    const trimmedQuestion = question.trim();
    onSubmit(trimmedQuestion);
    setQuestion("");
  };

  return (
    <form className="flex gap-2" onSubmit={(event) => handleSubmit(event)}>
      <input
        className="flex-1 border px-3 py-2 rounded"
        placeholder="오늘 뉴스에 대해 질문해보세요"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        disabled={isLoading}
        aria-label="뉴스 질문 입력"
      />
      <Button variant="primary" size="md" disabled={isSubmitDisabled}>
        질문하기
      </Button>
    </form>
  );
};

export default QuestionInput;
