import { useState } from "react";
import { useQA } from "../hooks/useQA";
import Text from "../components/shared/Text";
import QuestionInput from "../components/NewsQA/QuestionInput";
import AnswerBox, {
  type QAChatMessage,
  type QAStreamStatus,
} from "../components/NewsQA/AnswerBox";

export default function NewsQA() {
  const { mutateAsync, isPending } = useQA();
  const [messages, setMessages] = useState<QAChatMessage[]>([]);

  const makeId = () =>
    `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const handleSubmit = async (question: string) => {
    const userId = makeId();
    const assistantId = makeId();

    setMessages((prev) => [
      ...prev,
      { id: userId, role: "user", content: question },
      {
        id: assistantId,
        role: "assistant",
        content: "",
        status: "pending",
      },
    ]);

    try {
      const data = await mutateAsync(question);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: data.answer, status: "done" as QAStreamStatus }
            : m,
        ),
      );
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "답변 생성에 실패했습니다.";

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content: `에러: ${errorMessage}`,
                status: "error" as QAStreamStatus,
              }
            : m,
        ),
      );
    }
  };

  return (
    <div className="px-12 py-8 max-w-3xl mx-auto">
      <Text as="h1" size="xl" weight="700">
        뉴스 Q&A
      </Text>

      <Text className="mt-2 text-gray-600">
        오늘의 뉴스 전체를 기반으로 질문해보세요.
      </Text>

      <div className="mt-6">
        <QuestionInput isLoading={isPending} onSubmit={handleSubmit} />
      </div>

      <AnswerBox messages={messages} />
    </div>
  );
}
