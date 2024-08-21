import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ICategoryInfo } from "../types";
import axios from "axios";

interface CategoryInputProps {
  setSelectedCategoryInfo: Dispatch<SetStateAction<ICategoryInfo>>;
}

const CategoryInput = ({ setSelectedCategoryInfo }: CategoryInputProps) => {
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

  return (
    <div className="select-container">
      <label htmlFor="category">Select category</label>

      <select
        className="select-input"
        id="category"
        onChange={(e) => {
          const categoryInfo: ICategoryInfo = allCategories.filter(
            (catInfo: ICategoryInfo) => catInfo.name === e.target.value
          )[0];
          setSelectedCategoryInfo({
            id: categoryInfo.id,
            name: categoryInfo.name,
          });
        }}
      >
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
