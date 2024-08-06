import { IQuestionInfo } from "./types";

interface SingleQuestionProps {
  question: IQuestionInfo;
}

function SingleQuestion({ question }: SingleQuestionProps) {
  return (
    <>
      <h1>{question.question}</h1>
      <p>{question.correct_answer}</p>
      <p>{question.incorrect_answers.join(" ")}</p>
      <hr />
    </>
  );
}

export default SingleQuestion;
