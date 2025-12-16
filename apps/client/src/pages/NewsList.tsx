import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNewsList } from "../hooks/useNewsList";
import type { News } from "../types/news";
import { type CategoryId } from "../constants/category";
import Text from "../components/shared/Text";
import NewsCard from "../components/NewsList/NewsCard";
import CategoryTabs from "../components/NewsList/CategoryTabs";

export default function NewsList() {
  const navigate = useNavigate();
  const [category, setCategory] = useState<CategoryId>("101");
  const { data: news = [], isLoading, isError } = useNewsList(category);

  const handleClick = (item: News) => {
    const { url } = item;
    navigate(`/news?url=${encodeURIComponent(url)}`);
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text color="red">Failed to load news.</Text>;

  return (
    <div>
      <Text as="h1" size="xl" weight="700" color="black">
        오늘의 뉴스
      </Text>

      <CategoryTabs category={category} setCategory={setCategory} />

      <div className="flex flex-col gap-2">
        {news.map((item) => (
          <NewsCard key={item.url} news={item} onClick={handleClick} />
        ))}
      </div>
    </div>
  );
}
