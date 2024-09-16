import { useEffect, useState } from "react";
import { ICategoryInputProps, ICategoryInfo } from "../types";
import axios from "axios";

const CategoryInput = ({ setSelectedCategoryInfo }: ICategoryInputProps) => {
  const [categories, setCategories] = useState<ICategoryInfo[]>([]);

  useEffect(() => {
    const fetchAndStoreAllCategories = async () => {
      try {
        const response = await axios.get(
          "https://opentdb.com/api_category.php"
        );
        setCategories(response.data.trivia_categories);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAndStoreAllCategories();
  }, []);

  const handleChangeCategory = (categoryName: string) => {
    if (categoryName === "none") {
      setSelectedCategoryInfo(null);
    } else {
      const categoryInfo: ICategoryInfo = categories.filter(
        (catInfo: ICategoryInfo) => catInfo.name === categoryName
      )[0];
      setSelectedCategoryInfo(categoryInfo);
    }
  };

  return (
    <div className="select-container">
      <label htmlFor="category">Select category</label>

      <select
        className="select-input"
        id="category"
        onChange={(e) => handleChangeCategory(e.target.value)}
      >
        <option value="none">Choose a category</option>
        {categories.map((data) => (
          <option key={data.id} value={data.name}>
            {data.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryInput;
