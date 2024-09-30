import { useRef, useState } from "react";
import Header from "./Header";
import QuizDisplay from "./QuizDisplay";
import QuizSetup from "./QuizSetup";
import Report from "./Report";
import { IQuestionInfo, QuizStatus } from "../types";
import "../styles.css";

const App = () => {
  const [questions, setQuestions] = useState<IQuestionInfo[]>([]);
  const [quizStatus, setQuizStatus] = useState<QuizStatus>("notStarted");

  const handleReturnToQuizSetup = () => {
    setQuizStatus("notStarted");
    noOfCorrectAnswers.current = 0;
  };

  const noOfCorrectAnswers = useRef(0);

  return (
    <div className="app">
      <Header />
      {quizStatus === "notStarted" && (
        <QuizSetup setQuestions={setQuestions} setQuizStatus={setQuizStatus} />
      )}
      {quizStatus == "inProgress" && (
        <QuizDisplay
          questions={questions}
          setQuizStatus={setQuizStatus}
          noOfCorrectAnswers={noOfCorrectAnswers}
          handleReturnToQuizSetup={handleReturnToQuizSetup}
        />
      )}
      {quizStatus === "completed" && (
        <Report
          noOfCorrectAnswers={noOfCorrectAnswers.current}
          totalQuestions={questions.length}
          handleReturnToQuizSetup={handleReturnToQuizSetup}
        />
      )}
    </div>
  );
};

export default App;
