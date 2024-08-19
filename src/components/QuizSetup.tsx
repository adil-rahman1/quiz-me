import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Radio,
  RadioGroup,
  Stack,
  VStack,
  FormControl,
  FormLabel,
  HStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import {
  DifficultyType,
  QuestionType,
  QuizStatusType,
  ICategoryInfo,
  IQuestionInfo,
} from "../types";
import { Dispatch, SetStateAction } from "react";
import SelectComponent from "./SelectComponent";

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
      id: 9,
      name: "General Knowledge",
    });

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

          <SelectComponent
            setSelectedCategoryInfo={setSelectedCategoryInfo}
          ></SelectComponent>

          <button
            onClick={handleGenerateQuiz}
            disabled={selectedCategoryInfo.name === "" ? true : false}
          >
            Begin
          </button>
        </VStack>
      </FormControl>
    </>
  );
};

export default QuizSetup;
