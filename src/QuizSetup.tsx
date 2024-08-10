import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Radio,
  RadioGroup,
  Stack,
  Select,
  Button,
  VStack,
  FormControl,
  FormLabel,
  HStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Difficulty,
  QuestionType,
  ICategoryInfo,
  IQuestionInfo,
} from "./types";
import { Dispatch, SetStateAction } from "react";

interface QuizSetupProps {
  setAllQuestions: Dispatch<SetStateAction<IQuestionInfo[]>>;
  allCategories: ICategoryInfo[];
  setAllCategories: Dispatch<SetStateAction<ICategoryInfo[]>>;
  setQuizStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

function QuizSetup({
  setAllQuestions,
  allCategories,
  setAllCategories,
  setQuizStarted,
}: QuizSetupProps) {
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [questionType, setQuestionType] = useState<QuestionType>("multiple");
  const [selectedCategoryInfo, setSelectedCategoryInfo] =
    useState<ICategoryInfo>({
      id: -1,
      name: "",
    });

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
        `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${selectedCategoryInfo.id}&difficulty=${difficulty}&type=${questionType}`
      );
      setAllQuestions(response.data.results);
      setQuizStarted(true);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <FormControl>
        <VStack spacing="24px">
          <HStack>
            <FormLabel>Number of questions</FormLabel>
            <NumberInput
              size="lg"
              maxW={32}
              defaultValue={numberOfQuestions}
              min={10}
              max={50}
              step={5}
              onChange={(_stringVal: string, numVal: number) => {
                setNumberOfQuestions(numVal);
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </HStack>
          <HStack>
            <FormLabel>Select difficulty</FormLabel>

            <RadioGroup
              onChange={(nextVal: string) =>
                setDifficulty(nextVal as Difficulty)
              }
              value={difficulty}
            >
              <Stack direction="row">
                <Radio value="easy">Easy</Radio>
                <Radio value="medium">Medium</Radio>
                <Radio value="hard">Hard</Radio>
              </Stack>
            </RadioGroup>
          </HStack>

          <HStack>
            <FormLabel>Select question type</FormLabel>

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
          </HStack>

          <HStack>
            <FormLabel>Select category</FormLabel>

            <Select
              size="md"
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
          </HStack>
          <Button
            onClick={handleGenerateQuiz}
            colorScheme="blue"
            isDisabled={selectedCategoryInfo.name === "" ? true : false}
          >
            Begin
          </Button>
        </VStack>
      </FormControl>
    </>
  );
}

export default QuizSetup;
