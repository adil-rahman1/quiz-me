import { Button, SimpleGrid } from "@chakra-ui/react";
import { IQuestionInfo } from "./types";
import shuffle from "./shuffleArray";
import { useEffect, useState } from "react";

interface SingleQuestionProps {
  questionInfo: IQuestionInfo;
  selectedAnswer: number | null;
  setSelectedAnswer: React.Dispatch<React.SetStateAction<number | null>>;
  answerIsSubmitted: boolean;
}

function SingleQuestion({
  questionInfo,
  selectedAnswer,
  setSelectedAnswer,
  answerIsSubmitted,
}: SingleQuestionProps) {
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

  useEffect(() => {
    const shuffled = shuffle([
      ...questionInfo.incorrect_answers,
      questionInfo.correct_answer,
    ]);
    setShuffledAnswers(shuffled);
  }, [questionInfo]);

  function handleSelectAnAnswer(idx: number) {
    setSelectedAnswer(selectedAnswer === idx ? null : idx);
  }

  return (
    <>
      <h1 className="question">{questionInfo.question}</h1>
      <SimpleGrid columns={2} spacing={10}>
        {shuffledAnswers.map((ans, idx) => (
          <Button
            key={idx}
            onClick={() => {
              handleSelectAnAnswer(idx);
            }}
            colorScheme={selectedAnswer === idx ? "blue" : "gray"}
            variant={selectedAnswer === idx ? "solid" : "outline"}
            isDisabled={answerIsSubmitted}
          >
            {ans}
          </Button>
        ))}
      </SimpleGrid>
    </>
  );
}

export default SingleQuestion;
