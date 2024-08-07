import { Button } from "@chakra-ui/react";
import { IQuestionInfo } from "./types";
import { useState } from "react";

interface SingleQuestionProps {
  questionInfo: IQuestionInfo;
  setCurrentQNo: React.Dispatch<React.SetStateAction<number>>;
}

function SingleQuestion({ questionInfo, setCurrentQNo }: SingleQuestionProps) {
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
      <h1>{questionInfo.question}</h1>
      <p>{questionInfo.correct_answer}</p>
      <p>{questionInfo.incorrect_answers.join(" ")}</p>
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
