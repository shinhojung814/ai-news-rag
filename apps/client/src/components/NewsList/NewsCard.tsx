import { memo } from "react";
import type { News } from "../../types/news";
import Text from "../shared/Text";

interface NewsCardProps {
  news: News;
  onClick: (news: News) => void;
}

const NewsCard = memo(({ news, onClick }: NewsCardProps) => {
  const { title, press } = news;

  return (
    <div
      className="px-4 py-2 border-2 rounded-lg cursor-pointer"
      onClick={() => onClick(news)}
    >
      <Text as="h3" size="lg" weight="600" color="black">
        {title}
      </Text>
      <Text as="p" size="md" weight="500" color="black">
        {press}
      </Text>
    </div>
  );
});

export default NewsCard;
