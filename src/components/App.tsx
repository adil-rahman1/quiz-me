import { useRef, useState } from "react";
import Header from "./Header";
import QuizDisplay from "./QuizDisplay";
import QuizSetup from "./QuizSetup";
import Report from "./Report";
import { IQuestionInfo, QuizStatusType } from "../types";
import "../styles.css";

const App = () => {
  const [allQuestions, setAllQuestions] = useState<IQuestionInfo[]>([]);
  const [quizStatus, setQuizStatus] = useState<QuizStatusType>("notStarted");

  const handleReturnToQuizSetup = () => {
    setQuizStatus("notStarted");
    noOfCorrectAnswers.current = 0;
  };

  const noOfCorrectAnswers = useRef(0);

  return (
    <div className="app">
      <Header />
      {quizStatus === "notStarted" && (
        <QuizSetup
          setAllQuestions={setAllQuestions}
          setQuizStatus={setQuizStatus}
        />
      )}
      {quizStatus == "inProgress" && (
        <QuizDisplay
          allQuestions={allQuestions}
          setQuizStatus={setQuizStatus}
          noOfCorrectAnswers={noOfCorrectAnswers}
          handleReturnToQuizSetup={handleReturnToQuizSetup}
        />
      )}
      {quizStatus === "completed" && (
        <Report
          noOfCorrectAnswers={noOfCorrectAnswers.current}
          totalQuestions={allQuestions.length}
          handleReturnToQuizSetup={handleReturnToQuizSetup}
        />
      )}
    </div>
  );
};

export default App;
