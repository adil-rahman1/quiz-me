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
  const [answers, setAnswers] = useState<IAnswerInfo[]>([]);

  useEffect(() => {
    const allAnswers: string[] = [
      questionInfo.correct_answer,
      ...questionInfo.incorrect_answers,
    ];

    const answersAsAnswerInfoList: IAnswerInfo[] = allAnswers.map(
      (answerText, idx) => {
        return {
          isCorrect: idx === 0 ? true : false,
          text: answerText,
        };
      }
    );

    // If quiz questions are of type true/false, then sort the array so True is always displayed before False
    if (answersAsAnswerInfoList.length === 2) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      answersAsAnswerInfoList.sort((a, _b) => {
        if (a.text == "True") return -1;
        else return 1;
      });
    }

    setAnswers(
      answersAsAnswerInfoList.length === 2
        ? answersAsAnswerInfoList
        : shuffle(answersAsAnswerInfoList)
    );
  }, [questionInfo]);

  function handleSelectAnAnswer(idx: number) {
    setSelectedAnswer(selectedAnswer === idx ? null : idx);
  }

  return (
    <>
      <h1 className="question">{questionInfo.question}</h1>
      <SimpleGrid columns={2} spacing={10}>
        {answers.map((answer, idx) => (
          <Button
            key={idx}
            onClick={() => {
              handleSelectAnAnswer(idx);
            }}
            colorScheme={selectedAnswer === idx ? "blue" : "gray"}
            variant={selectedAnswer === idx ? "solid" : "outline"}
            isDisabled={answerIsSubmitted}
          >
            {answer.text}
          </Button>
        ))}
      </SimpleGrid>
    </>
  );
}

export default SingleQuestion;
