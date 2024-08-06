import { useState } from "react";
import Header from "./Header";
import QuizSetup from "./QuizSetup";
import { ICategoryInfo, IQuestionInfo } from "./types";
import QuestionDisplay from "./QuestionDisplay";

function App() {
  const [questions, setQuestions] = useState<IQuestionInfo[]>([]);
  const [allCategories, setAllCategories] = useState<ICategoryInfo[]>([]);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);

  return (
    <>
      <Header></Header>
      {!quizStarted && (
        <QuizSetup
          setQuestions={setQuestions}
          allCategories={allCategories}
          setAllCategories={setAllCategories}
          setQuizStarted={setQuizStarted}
        ></QuizSetup>
      )}
      {quizStarted && (
        <QuestionDisplay
          questions={questions}
          setQuizStarted={setQuizStarted}
        ></QuestionDisplay>
      )}
    </>
  );
}

export default App;
