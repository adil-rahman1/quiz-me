import { useState } from "react";
import SingleQuestion from "./SingleQuestion";
import { IQuestionInfo } from "./types";
import { Button } from "@chakra-ui/react";

interface QuizDisplayProps {
  allQuestions: IQuestionInfo[];
  setQuizStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

function QuizDisplay({ allQuestions, setQuizStarted }: QuizDisplayProps) {
  const [currentQNo, setCurrentQNo] = useState<number>(0);

  return (
    <div>
      <SingleQuestion
        questionInfo={allQuestions[currentQNo]}
        setCurrentQNo={setCurrentQNo}
      ></SingleQuestion>
      <Button onClick={() => setQuizStarted(false)} colorScheme="blue">
        Back to start
      </Button>
    </div>
  );
}

export default QuizDisplay;
