import Text from "../shared/Text";

interface AnswerBoxProps {
  answer?: string;
  isLoading: boolean;
  errorMessage?: string;
}

const AnswerBox = ({ answer, isLoading, errorMessage }: AnswerBoxProps) => {
  if (isLoading) {
    return <Text className="mt-4">답변 생성 중...</Text>;
  }

  if (errorMessage) {
    return (
      <Text color="red" className="mt-6 p-4 border rounded">
        에러: {errorMessage}
      </Text>
    );
  }

  if (!answer) return null;

  return (
    <div className="mt-6 p-4 border rounded bg-gray-50">
      <Text className="whitespace-pre-line">{answer}</Text>
    </div>
  );
};

export default AnswerBox;
