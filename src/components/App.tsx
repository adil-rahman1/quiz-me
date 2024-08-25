import { useRef, useState } from "react";
import Header from "./Header";
import QuizSetup from "./QuizSetup";
import { QuizStatusType, IQuestionInfo } from "../types";
import QuizDisplay from "./QuizDisplay";
import "../styles.css";
import Report from "./Report";

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
      <Header></Header>
      {quizStatus === "notStarted" && (
        <QuizSetup
          setAllQuestions={setAllQuestions}
          setQuizStatus={setQuizStatus}
        ></QuizSetup>
      )}
      {quizStatus == "inProgress" && (
        <QuizDisplay
          allQuestions={allQuestions}
          setQuizStatus={setQuizStatus}
          noOfCorrectAnswers={noOfCorrectAnswers}
          handleReturnToQuizSetup={handleReturnToQuizSetup}
        ></QuizDisplay>
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

export default App;
