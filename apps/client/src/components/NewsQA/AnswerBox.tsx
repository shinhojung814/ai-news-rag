import Text from "../shared/Text";

interface AnswerBoxProps {
  answer?: string;
  isLoading: boolean;
}

const AnswerBox = ({ answer, isLoading }: AnswerBoxProps) => {
  if (isLoading) {
    return <Text className="mt-4">답변 생성 중...</Text>;
  }

  if (!answer) return null;

  return (
    <div className="mt-6 p-4 border rounded bg-gray-50">
      <Text className="whitespace-pre-line">{answer}</Text>
    </div>
  );
};

export default AnswerBox;
