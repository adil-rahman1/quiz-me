import { useEffect, useState } from "react";
import { ICategoryInputProps, ICategoryInfo } from "../types";
import axios from "axios";

const CategoryInput = ({ setSelectedCategoryInfo }: ICategoryInputProps) => {
  const [allCategories, setAllCategories] = useState<ICategoryInfo[]>([]);

  useEffect(() => {
    const fetchAndStoreAllCategories = async () => {
      try {
        const response = await axios.get(
          "https://opentdb.com/api_category.php"
        );
        setAllCategories(response.data.trivia_categories);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAndStoreAllCategories();
  }, []);

  const handleChangeCategory = (categoryName: string) => {
    if (categoryName === "none") {
      setSelectedCategoryInfo({
        id: -1,
        name: "",
      });
    } else {
      const categoryInfo: ICategoryInfo = allCategories.filter(
        (catInfo: ICategoryInfo) => catInfo.name === categoryName
      )[0];
      setSelectedCategoryInfo({
        id: categoryInfo.id,
        name: categoryInfo.name,
      });
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
        {allCategories.map((data) => (
          <option key={data.id} value={data.name}>
            {data.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryInput;
