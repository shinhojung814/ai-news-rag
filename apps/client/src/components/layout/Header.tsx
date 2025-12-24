import { useNavigate } from "react-router-dom";
import Text from "../shared/Text";
import Button from "../shared/Button";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center border-b px-12 py-4 mb-6">
      <Text as="h1" size="lg" weight="700" color="gray">
        AI News RAG
      </Text>

      <div className="flex justify-between items-center gap-4">
        <Button variant="primary" onClick={() => navigate("/")}>
          <Text as="h2" size="lg" weight="700" color="white">
            오늘의 뉴스
          </Text>
        </Button>

        <Button variant="outline" onClick={() => navigate("/qa")}>
          <Text as="h2" size="lg" weight="700" color="black">
            뉴스 Q&A
          </Text>
        </Button>
      </div>
    </header>
  );
}
