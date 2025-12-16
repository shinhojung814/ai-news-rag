import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNewsDetail } from "../hooks/useNewsDetail";
import { useSummary } from "../hooks/useSummary";
import Text from "../components/shared/Text";
import Button from "../components/shared/Button";
import Modal from "../components/shared/Modal";

export default function NewsDetail() {
  const [params] = useSearchParams();
  const url = params.get("url") || "";
  const [open, setOpen] = useState(false);

  const { data: article, isLoading, isError } = useNewsDetail(url);
  const { mutate: requestSummary, data: summaryData, isPending } = useSummary();

  const handleSummary = () => {
    if (!article) return;
    setOpen(true);
    requestSummary({ title: article.title, content: article.content });
  };

  if (isLoading) return <Text>Loading article...</Text>;
  if (isError) return <Text color="red">Failed to load article</Text>;

  return (
    <div>
      <Text as="h1" size="xl" weight="700">
        {article?.title}
      </Text>

      <Text as="p" size="sm" weight="500" color="gray" className="mt-2">
        {article?.press}
      </Text>

      <Button
        variant="primary"
        size="md"
        className="mt-4"
        onClick={handleSummary}
      >
        요약 보기 (RAG)
      </Button>

      <Text className="mt-8 whitespace-pre-line">{article?.content}</Text>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <Text as="h2" size="lg" weight="600">
          기사 요약
        </Text>

        {isPending ? (
          <Text className="mt-4">요약 생성 중...</Text>
        ) : (
          <Text className="mt-4 whitespace-pre-line">
            {summaryData?.summary ?? "요약을 가져오지 못했습니다."}
          </Text>
        )}
      </Modal>
    </div>
  );
}
