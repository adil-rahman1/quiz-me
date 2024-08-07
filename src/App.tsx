import { useState } from "react";
import Header from "./Header";
import QuizSetup from "./QuizSetup";
import { ICategoryInfo, IQuestionInfo } from "./types";
import QuizDisplay from "./QuizDisplay";

function App() {
  const [allQuestions, setAllQuestions] = useState<IQuestionInfo[]>([]);
  const [allCategories, setAllCategories] = useState<ICategoryInfo[]>([]);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);

  return (
    <>
      <Header></Header>
      {!quizStarted && (
        <QuizSetup
          setAllQuestions={setAllQuestions}
          allCategories={allCategories}
          setAllCategories={setAllCategories}
          setQuizStarted={setQuizStarted}
        ></QuizSetup>
      )}
      {quizStarted && (
        <QuizDisplay
          allQuestions={allQuestions}
          setQuizStarted={setQuizStarted}
        ></QuizDisplay>
      )}
    </>
  );
}

export default App;
