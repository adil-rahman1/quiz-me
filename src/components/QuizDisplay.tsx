import { useRef, useState } from "react";
import SingleQuestion from "./SingleQuestion";
import { IAnswerInfo, IQuestionInfo, QuizStatusType } from "../types";
import Report from "./Report";
import ReturnToQuizSetupBtn from "./ReturnToQuizSetupBtn";

interface QuizDisplayProps {
  allQuestions: IQuestionInfo[];
  quizStatus: QuizStatusType;
  setQuizStatus: React.Dispatch<React.SetStateAction<QuizStatusType>>;
}

const QuizDisplay = ({
  allQuestions,
  quizStatus,
  setQuizStatus,
}: QuizDisplayProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [allAnswers, setAllAnswers] = useState<IAnswerInfo[]>([]);
  const [answerIsSubmitted, setAnswerIsSubmitted] = useState<boolean>(false);
  const [nextBtnIsDisabled, setNextBtnIsDisabled] = useState<boolean>(true);
  const [currentQNo, setCurrentQNo] = useState<number>(0);

  const noOfCorrectAnswers = useRef(0);

  const handleSubmitAnswer = () => {
    setAnswerIsSubmitted(true);
    setNextBtnIsDisabled(false);
    if (allAnswers[selectedAnswer!].text === correctAnswer.text)
      noOfCorrectAnswers.current++;
  };

  const handleClickNext = () => {
    if (currentQNo < allQuestions.length - 1) {
      setCurrentQNo((prev) => prev + 1);
      setSelectedAnswer(null);
      setAnswerIsSubmitted(false);
      setNextBtnIsDisabled(true);
    } else {
      setQuizStatus("completed");
    }
  };

  const handleReturnToQuizSetup = () => {
    setQuizStatus("notStarted");
  };

  const correctAnswer = allAnswers.filter(
    (answerInfo) => answerInfo.isCorrect === true
  )[0];

  const submitBtnIsDisabled =
    selectedAnswer == null || answerIsSubmitted === true;

  return (
    <div>
      {quizStatus === "inProgress" && (
        <>
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
              className={
                submitBtnIsDisabled ? "submit-btn locked" : "submit-btn"
              }
              disabled={submitBtnIsDisabled}
              onClick={handleSubmitAnswer}
            >
              Submit
            </button>
            <button
              className={nextBtnIsDisabled ? "next-btn locked" : "next-btn"}
              disabled={nextBtnIsDisabled}
              onClick={handleClickNext}
            >
              Next
            </button>
          </div>
        </>
      )}
      {quizStatus === "completed" && (
        <Report
          noOfCorrectAnswers={noOfCorrectAnswers.current}
          totalQuestions={allQuestions.length}
          handleReturnToQuizSetup={handleReturnToQuizSetup}
        ></Report>
      )}
    </div>
  );
};

export default QuizDisplay;
