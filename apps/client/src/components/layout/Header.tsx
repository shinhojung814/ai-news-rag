import { Link } from "react-router-dom";
import Text from "../shared/Text";

export default function Header() {
  return (
    <header className="border-b px-12 py-4 mb-6">
      <Link to="/">
        <Text as="h2" size="lg" weight="700" color="black">
          AI News RAG
        </Text>
      </Link>
    </header>
  );
}
