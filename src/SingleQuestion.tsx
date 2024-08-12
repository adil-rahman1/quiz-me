import { Button, SimpleGrid } from "@chakra-ui/react";
import { IQuestionInfo, IAnswerInfo } from "./types";
import shuffle from "./shuffleArray";
import { useEffect } from "react";

interface SingleQuestionProps {
  questionInfo: IQuestionInfo;
  selectedAnswer: number | null;
  setSelectedAnswer: React.Dispatch<React.SetStateAction<number | null>>;
  answerIsSubmitted: boolean;
  allAnswers: IAnswerInfo[];
  setAllAnswers: React.Dispatch<React.SetStateAction<IAnswerInfo[]>>;
}

const SingleQuestion = ({
  questionInfo,
  selectedAnswer,
  setSelectedAnswer,
  answerIsSubmitted,
  allAnswers,
  setAllAnswers,
}: SingleQuestionProps) => {
  useEffect(() => {
    const answers: string[] = [
      questionInfo.correct_answer,
      ...questionInfo.incorrect_answers,
    ];

    const answersAsAnswerInfoList: IAnswerInfo[] = answers.map(
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

    setAllAnswers(
      answersAsAnswerInfoList.length === 2
        ? answersAsAnswerInfoList
        : shuffle(answersAsAnswerInfoList)
    );
  }, [questionInfo]);

  const handleSelectAnAnswer = (idx: number) => {
    setSelectedAnswer(selectedAnswer === idx ? null : idx);
  };

  return (
    <>
      <h1 className="question">{questionInfo.question}</h1>
      <SimpleGrid columns={2} spacing={10}>
        {allAnswers.map((answer, idx) => (
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
};

export default SingleQuestion;
