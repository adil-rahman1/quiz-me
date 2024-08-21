import { useRef, useState } from "react";
import SingleQuestion from "./SingleQuestion";
import { IAnswerInfo, IQuestionInfo, QuizStatusType } from "../types";
import { Button } from "@chakra-ui/react";
import ProgressDisplay from "./Progress";
import Report from "./Report";

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
  const [nextButtonIsDisabled, setNextButtonIsDisabled] =
    useState<boolean>(true);
  const [currentQNo, setCurrentQNo] = useState<number>(0);

  const correctAnswers = useRef(0);

  const handleSubmitAnswer = () => {
    setAnswerIsSubmitted(true);
    setNextButtonIsDisabled(false);
    if (allAnswers[selectedAnswer!].text === correctAnswer)
      correctAnswers.current++;
  };

  const handleClickNext = () => {
    if (currentQNo < allQuestions.length - 1) {
      setCurrentQNo((prev) => prev + 1);
      setSelectedAnswer(null);
      setAnswerIsSubmitted(false);
      setNextButtonIsDisabled(true);
    } else {
      setQuizStatus("completed");
    }
  };

  const correctAnswer = quizStatus
    ? allQuestions[currentQNo].correct_answer
    : null;
  const progress = (currentQNo * 100) / allQuestions.length;

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
            <Button
              onClick={() => setQuizStatus("notStarted")}
              colorScheme="blue"
            >
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
            allAnswers[selectedAnswer!].text == correctAnswer ? (
              <p style={correctStyle}>{"That's correct"}</p>
            ) : (
              <p style={incorrectStyle}>{"That's incorrect"}</p>
            )}
          </div>
        </>
      )}
      {quizStatus === "completed" && (
        <Report
          correctAnswers={correctAnswers.current}
          totalQuestions={allQuestions.length}
        ></Report>
      )}
    </div>
  );
};

export default QuizDisplay;
