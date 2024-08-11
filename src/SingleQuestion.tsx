import { Button, SimpleGrid } from "@chakra-ui/react";
import { IQuestionInfo, IAnswerInfo } from "./types";
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
  const [quizAnswers, setQuizAnswers] = useState<IAnswerInfo[]>([]);

  useEffect(() => {
    const allAnswers: string[] = [
      questionInfo.correct_answer,
      ...questionInfo.incorrect_answers,
    ];

    const allAnswersWithInfo: IAnswerInfo[] = allAnswers.map(
      (answerText, idx) => {
        return {
          isCorrect: idx === 0 ? true : false,
          text: answerText,
        };
      }
    );

    // If quiz questions are of type true/false, then sort the array so True is always displayed before False
    if (allAnswersWithInfo.length === 2) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      allAnswersWithInfo.sort((a, _b) => {
        if (a.text == "True") return -1;
        else return 1;
      });
    }

    setQuizAnswers(
      allAnswersWithInfo.length === 2
        ? allAnswersWithInfo
        : shuffle(allAnswersWithInfo)
    );
  }, [questionInfo]);

  function handleSelectAnAnswer(idx: number) {
    setSelectedAnswer(selectedAnswer === idx ? null : idx);
  }

  return (
    <>
      <h1 className="question">{questionInfo.question}</h1>
      <SimpleGrid columns={2} spacing={10}>
        {quizAnswers.map((ans, idx) => (
          <Button
            key={idx}
            onClick={() => {
              handleSelectAnAnswer(idx);
            }}
            colorScheme={selectedAnswer === idx ? "blue" : "gray"}
            variant={selectedAnswer === idx ? "solid" : "outline"}
            isDisabled={answerIsSubmitted}
          >
            {ans.text}
          </Button>
        ))}
      </SimpleGrid>
    </>
  );
}

export default SingleQuestion;
