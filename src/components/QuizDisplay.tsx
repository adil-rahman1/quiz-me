import { useState } from "react";
import SingleQuestion from "./SingleQuestion";
import { IQuizDisplayProps, IAnswerInfo } from "../types";
import ReturnToQuizSetupBtn from "./ReturnToQuizSetupBtn";

const QuizDisplay = ({
  allQuestions,
  setQuizStatus,
  noOfCorrectAnswers,
  handleReturnToQuizSetup,
}: IQuizDisplayProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [allAnswers, setAllAnswers] = useState<IAnswerInfo[]>([]);
  const [answerIsSubmitted, setAnswerIsSubmitted] = useState<boolean>(false);
  const [isNextBtnDisabled, setIsNextBtnDisabled] = useState<boolean>(true);
  const [currentQNo, setCurrentQNo] = useState<number>(0);

  const handleSubmitAnswer = () => {
    setAnswerIsSubmitted(true);
    setIsNextBtnDisabled(false);
    if (allAnswers[selectedAnswer!].text === correctAnswer.text)
      noOfCorrectAnswers.current++;
  };

  const handleClickNext = () => {
    if (currentQNo < allQuestions.length - 1) {
      setCurrentQNo((prev) => prev + 1);
      setSelectedAnswer(null);
      setAnswerIsSubmitted(false);
      setIsNextBtnDisabled(true);
    } else {
      setQuizStatus("completed");
    }
  };

  const correctAnswer = allAnswers.filter(
    (answerInfo) => answerInfo.isCorrect === true
  )[0];

  const isSubmitBtnDisabled =
    selectedAnswer == null || answerIsSubmitted === true;

  return (
    <div className="quiz-display">
      <SingleQuestion
        questionInfo={allQuestions[currentQNo]}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
        answerIsSubmitted={answerIsSubmitted}
        allAnswers={allAnswers}
        setAllAnswers={setAllAnswers}
        currentQNo={currentQNo}
        totalQuestions={allQuestions.length}
      ></SingleQuestion>
      <div className="action-btns">
        <ReturnToQuizSetupBtn
          onClick={handleReturnToQuizSetup}
        ></ReturnToQuizSetupBtn>
        <button
          className={isSubmitBtnDisabled ? "submit-btn locked" : "submit-btn"}
          disabled={isSubmitBtnDisabled}
          onClick={handleSubmitAnswer}
        >
          Submit
        </button>
        <button
          className={isNextBtnDisabled ? "next-btn locked" : "next-btn"}
          disabled={isNextBtnDisabled}
          onClick={handleClickNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuizDisplay;
