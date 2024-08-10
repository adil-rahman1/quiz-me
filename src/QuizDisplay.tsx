import { useEffect, useState } from "react";
import SingleQuestion from "./SingleQuestion";
import { IQuestionInfo } from "./types";
import { Button } from "@chakra-ui/react";

interface QuizDisplayProps {
  allQuestions: IQuestionInfo[];
  setQuizStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

function QuizDisplay({ allQuestions, setQuizStarted }: QuizDisplayProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerIsSubmitted, setAnswerIsSubmitted] = useState<boolean>(false);
  const [nextButtonIsDisabled, setNextButtonIsDisabled] =
    useState<boolean>(true);
  const [currentQNo, setCurrentQNo] = useState<number>(0);

  useEffect(() => {
    console.log(selectedAnswer);
  }, [selectedAnswer]);

  function handleSubmitAnswer() {
    setAnswerIsSubmitted(true);
    setNextButtonIsDisabled(false);
  }

  function handleClickNext() {
    setCurrentQNo((prev) => prev + 1);
    setSelectedAnswer(null);
    setAnswerIsSubmitted(false);
    setNextButtonIsDisabled(true);
  }

  return (
    <div>
      <SingleQuestion
        questionInfo={allQuestions[currentQNo]}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
        answerIsSubmitted={answerIsSubmitted}
      ></SingleQuestion>
      <Button
        isDisabled={selectedAnswer == null || answerIsSubmitted === true}
        onClick={handleSubmitAnswer}
        colorScheme="blue"
      >
        Submit
      </Button>
      <Button
        isDisabled={nextButtonIsDisabled}
        onClick={handleClickNext}
        colorScheme="blue"
      >
        Next
      </Button>
      <Button onClick={() => setQuizStarted(false)} colorScheme="blue">
        Back to start
      </Button>
    </div>
  );
}

export default QuizDisplay;
