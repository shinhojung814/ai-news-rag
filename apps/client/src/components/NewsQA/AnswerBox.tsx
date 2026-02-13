import Text from "../shared/Text";
import { useTextStream } from "../../hooks/useTextStream";

export type QAStreamStatus = "pending" | "done" | "error";

export interface QAChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  status?: QAStreamStatus;
}

interface AnswerBoxProps {
  messages: QAChatMessage[];
}

const StreamedAssistantMessage = ({ content }: { content: string }) => {
  const streamed = useTextStream(content, 15);
  return <Text className="whitespace-pre-line">{streamed}</Text>;
};

const AnswerBox = ({ messages }: AnswerBoxProps) => {
  if (!messages.length) return null;

  const lastAssistantId = [...messages]
    .reverse()
    .find((m) => m.role === "assistant")?.id;

  return (
    <div className="mt-6 flex flex-col gap-3">
      {messages.map((m) => {
        const isLatestAssistant = m.id === lastAssistantId;
        const isAssistant = m.role === "assistant";

        return (
          <div
            key={m.id}
            className={`p-4 border rounded ${
              isAssistant ? "bg-gray-50" : "bg-white"
            }`}
          >
            {isAssistant ? (
              m.status === "pending" ? (
                <Text>답변 생성 중...</Text>
              ) : m.status === "error" ? (
                <Text color="red" className="whitespace-pre-line">
                  {m.content}
                </Text>
              ) : isLatestAssistant ? (
                <StreamedAssistantMessage content={m.content} />
              ) : (
                <Text className="whitespace-pre-line">{m.content}</Text>
              )
            ) : (
              <Text className="whitespace-pre-line">{m.content}</Text>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AnswerBox;
