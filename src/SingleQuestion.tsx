import { Button } from "@chakra-ui/react";
import { IQuestionInfo } from "./types";
import { useState } from "react";

interface SingleQuestionProps {
  question: IQuestionInfo;
  setCurrentQNo: React.Dispatch<React.SetStateAction<number>>;
}

function SingleQuestion({ question, setCurrentQNo }: SingleQuestionProps) {
  const [nextButtonIsDisabled, setNextButtonIsDisabled] =
    useState<boolean>(true);

  function handleSubmitAnswer() {
    setNextButtonIsDisabled(false);
  }

  function handleNextQuestion() {
    setCurrentQNo((prev) => prev + 1);
    setNextButtonIsDisabled(true);
  }

  return (
    <>
      <h1>{question.question}</h1>
      <p>{question.correct_answer}</p>
      <p>{question.incorrect_answers.join(" ")}</p>
      <hr />
      <Button onClick={handleSubmitAnswer} colorScheme="blue">
        Submit
      </Button>
      <Button
        isDisabled={nextButtonIsDisabled}
        onClick={handleNextQuestion}
        colorScheme="blue"
      >
        Next
      </Button>
    </>
  );
}

export default SingleQuestion;
