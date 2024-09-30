import { useState } from "react";
import SingleQuestion from "./SingleQuestion";
import { IQuizDisplayProps, IAnswerInfo } from "../types";
import ReturnToQuizSetupBtn from "./ReturnToQuizSetupBtn";

const QuizDisplay = ({
  questions,
  setQuizStatus,
  noOfCorrectAnswers,
  handleReturnToQuizSetup,
}: IQuizDisplayProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<IAnswerInfo[]>([]);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isNextBtnDisabled, setIsNextBtnDisabled] = useState<boolean>(true);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);

  const handleSubmitAnswer = () => {
    setIsAnswerSubmitted(true);
    setIsNextBtnDisabled(false);
    if (answers[selectedAnswer!].text === correctAnswer.text)
      noOfCorrectAnswers.current++;
  };

  const handleClickNext = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
      setIsNextBtnDisabled(true);
    } else {
      setQuizStatus("completed");
    }
  };

  const correctAnswer = answers.filter(
    (answerInfo) => answerInfo.isCorrect === true
  )[0];

  const isSubmitBtnDisabled = selectedAnswer == null || isAnswerSubmitted;

  return (
    <div className="quiz-display">
      <SingleQuestion
        questionInfo={questions[currentQuestionIdx]}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
        answerIsSubmitted={isAnswerSubmitted}
        answers={answers}
        setAnswers={setAnswers}
        currentQNo={currentQuestionIdx}
        totalQuestions={questions.length}
      />
      <div className="action-btns">
        <ReturnToQuizSetupBtn onClick={handleReturnToQuizSetup} />
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
