import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Radio,
  RadioGroup,
  Stack,
  HStack,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

type Difficulty = "easy" | "medium" | "hard";
type QuestionType = "multipleChoice" | "trueOrFalse";

interface Category {
  id: number;
  name: string;
}

function QuizSetup() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [questionType, setQuestionType] =
    useState<QuestionType>("multipleChoice");
  const [allCategories, setAllCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchAndStoreAllCategories() {
      try {
        const response = await axios.get(
          "https://opentdb.com/api_category.php"
        );
        setAllCategories(response.data.trivia_categories);
      } catch (error) {
        console.error(error);
      }
    }
    fetchAndStoreAllCategories();
  }, []);

  return (
    <>
      <HStack spacing="24px">
        <NumberInput
          size="sm"
          maxW={20}
          defaultValue={10}
          min={10}
          max={50}
          step={5}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        <RadioGroup
          onChange={(nextVal: string) => setDifficulty(nextVal as Difficulty)}
          value={difficulty}
        >
          <Stack direction="row">
            <Radio value="easy">Easy</Radio>
            <Radio value="medium">Medium</Radio>
            <Radio value="hard">Hard</Radio>
          </Stack>
        </RadioGroup>

        <RadioGroup
          onChange={(nextVal: string) =>
            setQuestionType(nextVal as QuestionType)
          }
          value={questionType}
        >
          <Stack direction="row">
            <Radio value="multipleChoice">Multiple Choice</Radio>
            <Radio value="trueOrFalse">True or False</Radio>
          </Stack>
        </RadioGroup>

        <Select placeholder="Category">
          {allCategories.map((data) => (
            <option key={data.id} value={data.name}>
              {data.name}
            </option>
          ))}
        </Select>
      </HStack>
    </>
  );
}

export default QuizSetup;
