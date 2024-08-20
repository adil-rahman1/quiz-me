import { VStack, FormControl } from "@chakra-ui/react";
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
import NumberInput from "./NumberInput";
import DifficultyRadioInput from "./DifficultyRadioInput";
import QuestionTypeRadioInput from "./QuestionTypeRadioInput";

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
          <NumberInput
            numberOfQuestions={numberOfQuestions}
            setNumberOfQuestions={setNumberOfQuestions}
          ></NumberInput>

          <DifficultyRadioInput
            setDifficulty={setDifficulty}
          ></DifficultyRadioInput>

          <QuestionTypeRadioInput
            setQuestionType={setQuestionType}
          ></QuestionTypeRadioInput>

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
