import { useState } from "react";
import Header from "./Header";
import QuizSetup from "./QuizSetup";
import { QuizStatusType, IQuestionInfo } from "../types";
import QuizDisplay from "./QuizDisplay";
import "../styles.css";

const App = () => {
  const [allQuestions, setAllQuestions] = useState<IQuestionInfo[]>([]);
  const [quizStatus, setQuizStatus] = useState<QuizStatusType>("notStarted");

  return (
    <div className="app">
      <Header></Header>
      {quizStatus === "notStarted" && (
        <QuizSetup
          setAllQuestions={setAllQuestions}
          setQuizStatus={setQuizStatus}
        ></QuizSetup>
      )}
      {quizStatus !== "notStarted" && (
        <QuizDisplay
          allQuestions={allQuestions}
          quizStatus={quizStatus}
          setQuizStatus={setQuizStatus}
        ></QuizDisplay>
      )}
    </div>
  );
};

export default App;
