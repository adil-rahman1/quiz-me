import axios from "axios";
import { useState } from "react";
import {
  IQuizSetupProps,
  DifficultyType,
  QuestionType,
  ICategoryInfo,
} from "../types";
import NumberInput from "./NumberInput";
import DifficultyRadioInput from "./DifficultyRadioInput";
import QuestionTypeRadioInput from "./QuestionTypeRadioInput";
import CategoryInput from "./CategoryInput";

const QuizSetup = ({ setAllQuestions, setQuizStatus }: IQuizSetupProps) => {
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<DifficultyType>("easy");
  const [questionType, setQuestionType] = useState<QuestionType>("multiple");
  const [selectedCategoryInfo, setSelectedCategoryInfo] =
    useState<ICategoryInfo>({
      id: -1,
      name: "",
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

  const isBeginQuizBtnDisabled =
    selectedCategoryInfo.name === "" ? true : false;

  return (
    <div className="quiz-setup">
      <NumberInput
        numberOfQuestions={numberOfQuestions}
        setNumberOfQuestions={setNumberOfQuestions}
      />
      <DifficultyRadioInput setDifficulty={setDifficulty} />
      <QuestionTypeRadioInput setQuestionType={setQuestionType} />
      <CategoryInput setSelectedCategoryInfo={setSelectedCategoryInfo} />
      <button
        className={
          isBeginQuizBtnDisabled ? "begin-quiz-btn locked" : "begin-quiz-btn"
        }
        onClick={handleGenerateQuiz}
        disabled={isBeginQuizBtnDisabled}
      >
        Begin
      </button>
    </div>
  );
};

export default QuizSetup;
