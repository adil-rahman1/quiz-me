import { useState } from "react";
import SingleQuestion from "./SingleQuestion";
import { IQuestionInfo } from "./types";
import { Button } from "@chakra-ui/react";

interface QuestionDisplayProps {
  questions: IQuestionInfo[];
  setQuizStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

function QuestionDisplay({ questions, setQuizStarted }: QuestionDisplayProps) {
  const [currentQNo, setCurrentQNo] = useState<number>(0);

  return (
    <div>
      <SingleQuestion
        question={questions[currentQNo]}
        setCurrentQNo={setCurrentQNo}
      ></SingleQuestion>
      <Button onClick={() => setQuizStarted(false)} colorScheme="blue">
        Back to start
      </Button>
    </div>
  );
}

export default QuestionDisplay;
