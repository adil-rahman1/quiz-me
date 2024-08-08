import { Button } from "@chakra-ui/react";
import { IQuestionInfo } from "./types";
import { useState } from "react";
import shuffle from "./shuffleArray";

interface SingleQuestionProps {
  questionInfo: IQuestionInfo;
  setCurrentQNo: React.Dispatch<React.SetStateAction<number>>;
}

function SingleQuestion({ questionInfo, setCurrentQNo }: SingleQuestionProps) {
  const [answerSelected, setAnswerSelected] = useState<boolean>(false);
  const [nextButtonIsDisabled, setNextButtonIsDisabled] =
    useState<boolean>(true);

  const possibleAnswersShuffled = shuffle([
    ...questionInfo.incorrect_answers,
    questionInfo.correct_answer,
  ]);

  function handleSelectAnAnswer() {
    setAnswerSelected((prev) => !prev);
  }

  function handleSubmitAnswer() {
    setNextButtonIsDisabled(false);
  }

  function handleNextQuestion() {
    setCurrentQNo((prev) => prev + 1);
    setAnswerSelected(false);
    setNextButtonIsDisabled(true);
  }

  return (
    <>
      <h1>{questionInfo.question}</h1>
      {possibleAnswersShuffled.map((ans, idx) => (
        <Button
          key={idx}
          onClick={handleSelectAnAnswer}
          colorScheme="blue"
          variant="outline"
        >
          {ans}
        </Button>
      ))}
      <hr />
      <Button
        isDisabled={!answerSelected}
        onClick={handleSubmitAnswer}
        colorScheme="blue"
      >
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
