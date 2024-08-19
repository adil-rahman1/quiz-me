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
  DifficultyType,
  QuestionType,
  QuizStatusType,
  ICategoryInfo,
  IQuestionInfo,
} from "../types";
import { Dispatch, SetStateAction } from "react";

interface QuizSetupProps {
  setAllQuestions: Dispatch<SetStateAction<IQuestionInfo[]>>;
  setQuizStatus: React.Dispatch<React.SetStateAction<QuizStatusType>>;
}

const QuizSetup = ({ setAllQuestions, setQuizStatus }: QuizSetupProps) => {
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<DifficultyType>("easy");
  const [questionType, setQuestionType] = useState<QuestionType>("multiple");
  const [selectedCategoryInfo, setSelectedCategoryInfo] =
    useState<ICategoryInfo>({
      id: -1,
      name: "",
    });
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

  const handleGenerateQuiz = async () => {
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${selectedCategoryInfo.id}&difficulty=${difficulty}&type=${questionType}`
      );
      switch (response.data.response_code) {
        case 0:
          setAllQuestions(response.data.results);
          setQuizStatus("inProgress");
          break;
        case 1:
          alert("There are not enough questions for your query");
      }
    } catch (error) {
      console.error(error);
    }
  };

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
                setDifficulty(nextVal as DifficultyType)
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
};

export default QuizSetup;
