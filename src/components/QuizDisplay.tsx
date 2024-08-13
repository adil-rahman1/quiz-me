import { useState } from "react";
import SingleQuestion from "./SingleQuestion";
import { IAnswerInfo, IQuestionInfo } from "../types";
import { Button } from "@chakra-ui/react";

interface QuizDisplayProps {
  allQuestions: IQuestionInfo[];
  setQuizStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuizDisplay = ({ allQuestions, setQuizStarted }: QuizDisplayProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [allAnswers, setAllAnswers] = useState<IAnswerInfo[]>([]);
  const [answerIsSubmitted, setAnswerIsSubmitted] = useState<boolean>(false);
  const [nextButtonIsDisabled, setNextButtonIsDisabled] =
    useState<boolean>(true);
  const [currentQNo, setCurrentQNo] = useState<number>(0);

  const handleSubmitAnswer = () => {
    setAnswerIsSubmitted(true);
    setNextButtonIsDisabled(false);
  };

  const handleClickNext = () => {
    setCurrentQNo((prev) => prev + 1);
    setSelectedAnswer(null);
    setAnswerIsSubmitted(false);
    setNextButtonIsDisabled(true);
  };

  const correctAnswer = allQuestions[currentQNo].correct_answer;

  const correctStyle = {
    color: "green",
    display: answerIsSubmitted ? "block" : "none",
  };

  const incorrectStyle = {
    color: "red",
    display: answerIsSubmitted ? "block" : "none",
  };

  return (
    <div>
      <SingleQuestion
        questionInfo={allQuestions[currentQNo]}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
        answerIsSubmitted={answerIsSubmitted}
        allAnswers={allAnswers}
        setAllAnswers={setAllAnswers}
      ></SingleQuestion>
      <div className="action-btns">
        <Button onClick={() => setQuizStarted(false)} colorScheme="blue">
          Back to start
        </Button>
        <Button
          isDisabled={selectedAnswer == null || answerIsSubmitted === true}
          onClick={handleSubmitAnswer}
          colorScheme="blue"
        >
          Submit
        </Button>
        <Button
          isDisabled={nextButtonIsDisabled}
          onClick={handleClickNext}
          colorScheme="blue"
        >
          Next
        </Button>
      </div>
      <div className="feedback">
        {answerIsSubmitted &&
          allAnswers[selectedAnswer!].text == correctAnswer && (
            <p style={correctStyle}>{"That's correct"}</p>
          )}
        {answerIsSubmitted &&
          allAnswers[selectedAnswer!].text !== correctAnswer && (
            <p style={incorrectStyle}>{"That's incorrect"}</p>
          )}
      </div>
    </div>
  );
};

export default QuizDisplay;
