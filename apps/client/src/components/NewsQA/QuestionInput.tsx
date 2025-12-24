import { useState } from "react";
import Button from "../shared/Button";

interface QuestionInputProps {
  onSubmit: (question: string) => void;
  isLoading: boolean;
}

const QuestionInput = ({ onSubmit, isLoading }: QuestionInputProps) => {
  const [question, setQuestion] = useState("");

  return (
    <div className="flex gap-2">
      <input
        className="flex-1 border px-3 py-2 rounded"
        placeholder="오늘 뉴스에 대해 질문해보세요"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <Button
        variant="primary"
        size="md"
        disabled={isLoading || !question.trim()}
        onClick={() => onSubmit(question)}
      >
        질문하기
      </Button>
    </div>
  );
};

export default QuestionInput;
