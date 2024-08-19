import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ICategoryInfo } from "../types";
import axios from "axios";

interface SelectComponentProps {
  setSelectedCategoryInfo: Dispatch<SetStateAction<ICategoryInfo>>;
}

const SelectComponent = ({ setSelectedCategoryInfo }: SelectComponentProps) => {
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
    <div>
      <label htmlFor="category">Select category</label>

      <select
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

export default SelectComponent;
