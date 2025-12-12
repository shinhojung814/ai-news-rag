import { useSearchParams } from "react-router-dom";
import { useNewsDetail } from "../hooks/useNewsDetail";
import Text from "../components/shared/Text";
import Button from "../components/shared/Button";

export default function NewsDetail() {
  const [params] = useSearchParams();
  const url = params.get("url") || "";

  const { data: article, isLoading, isError } = useNewsDetail(url);

  if (isLoading) return <Text>Loading article...</Text>;
  if (isError) return <Text color="red">Failed to load article</Text>;
  if (!article) return <div>Loading...</div>;

  return (
    <div>
      <Text as="h1" size="xl" weight="700">
        {article.title}
      </Text>

      <Text as="p" size="sm" weight="500" color="gray" className="mt-2">
        {article.press}
      </Text>

      <Button variant="primary" size="md" className="mt-4">
        요약 보기 (RAG)
      </Button>

      <Text className="mt-8 whitespace-pre-line">{article.content}</Text>
    </div>
  );
}
