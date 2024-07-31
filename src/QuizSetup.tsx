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
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

type Difficulty = "easy" | "medium" | "hard";
type QuestionType = "multiple" | "boolean";

interface ICategoryInfo {
  id: number;
  name: string;
}

interface IQuestion {
  type: "multiple" | "boolean";
  difficulty: Difficulty;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

function QuizSetup() {
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [questionType, setQuestionType] = useState<QuestionType>("multiple");
  const [selectedCategoryInfo, setSelectedCategoryInfo] =
    useState<ICategoryInfo>({
      id: -1,
      name: "",
    });
  const [allCategories, setAllCategories] = useState<ICategoryInfo[]>([]);
  const [questions, setQuestions] = useState<IQuestion[]>([]);

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

  async function handleGenerateQuiz() {
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=${5}&category=${
          selectedCategoryInfo.id
        }&difficulty=${difficulty}&type=${questionType}`
      );
      setQuestions(response.data.results);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <HStack spacing="24px">
        <NumberInput
          size="lg"
          maxW={32}
          defaultValue={numberOfQuestions}
          min={10}
          max={50}
          step={5}
          onChange={(stringVal: string, numVal: number) => {
            setNumberOfQuestions(numVal);
          }}
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
            <Radio value="multiple">Multiple Choice</Radio>
            <Radio value="boolean">True or False</Radio>
          </Stack>
        </RadioGroup>

        <Select
          onChange={(e) => {
            const categoryInfo: ICategoryInfo = allCategories.filter(
              (catInfo: ICategoryInfo) => catInfo.name === e.target.value
            )[0];
            setSelectedCategoryInfo({
              id: categoryInfo.id,
              name: categoryInfo.name,
            });
          }}
          placeholder="Category"
        >
          {allCategories.map((data) => (
            <option key={data.id} value={data.name}>
              {data.name}
            </option>
          ))}
        </Select>
        <Button
          onClick={handleGenerateQuiz}
          colorScheme="blue"
          isDisabled={selectedCategoryInfo.name === "" ? true : false}
        >
          Begin
        </Button>
      </HStack>
    </>
  );
}

export default QuizSetup;
