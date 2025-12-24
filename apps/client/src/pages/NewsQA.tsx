import { useQA } from "../hooks/useQA";
import Text from "../components/shared/Text";
import QuestionInput from "../components/NewsQA/QuestionInput";
import AnswerBox from "../components/NewsQA/AnswerBox";

export default function NewsQA() {
  const { mutate, data, isPending } = useQA();

  return (
    <div className="px-12 py-8 max-w-3xl mx-auto">
      <Text as="h1" size="xl" weight="700">
        뉴스 Q&A
      </Text>

      <Text className="mt-2 text-gray-600">
        오늘의 뉴스 전체를 기반으로 질문해보세요.
      </Text>

      <div className="mt-6">
        <QuestionInput isLoading={isPending} onSubmit={(q) => mutate(q)} />
      </div>

      <AnswerBox isLoading={isPending} answer={data?.answer} />
    </div>
  );
}
