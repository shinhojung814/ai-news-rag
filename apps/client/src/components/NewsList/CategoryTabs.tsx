import { CATEGORY_LIST, type CategoryId } from "../../constants/category";
import Button from "../shared/Button";

interface CategoryTabsProps {
  category: CategoryId;
  setCategory: (category: CategoryId) => void;
}

const CategoryTabs = ({ category, setCategory }: CategoryTabsProps) => {
  return (
    <div className="flex gap-3 my-4">
      {CATEGORY_LIST.map((cat) => (
        <Button
          key={cat.id}
          variant={category === cat.id ? "primary" : "outline"}
          size="sm"
          onClick={() => setCategory(cat.id)}
        >
          {cat.name}
        </Button>
      ))}
    </div>
  );
};

export default CategoryTabs;
