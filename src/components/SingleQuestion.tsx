import { IQuestionInfo, IAnswerInfo } from "../types";
import shuffle from "../shuffleArray";
import { useEffect } from "react";

interface SingleQuestionProps {
  questionInfo: IQuestionInfo;
  selectedAnswer: number | null;
  setSelectedAnswer: React.Dispatch<React.SetStateAction<number | null>>;
  answerIsSubmitted: boolean;
  allAnswers: IAnswerInfo[];
  setAllAnswers: React.Dispatch<React.SetStateAction<IAnswerInfo[]>>;
  currentQNo: number;
  totalQuestions: number;
}

const SingleQuestion = ({
  questionInfo,
  selectedAnswer,
  setSelectedAnswer,
  answerIsSubmitted,
  allAnswers,
  setAllAnswers,
  currentQNo,
  totalQuestions,
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
      <div>
        <h1 className="progress">
          Question <span className="question-number">{currentQNo + 1}</span>/
          {totalQuestions}
        </h1>
        <p className="question-text">{questionInfo.question}</p>
      </div>
      <div className="answer-grid">
        {allAnswers.map((answer, idx) => (
          <button
            className={
              selectedAnswer === idx
                ? "answer-btn selected-answer-btn"
                : "answer-btn"
            }
            type="button"
            key={idx}
            onClick={() => {
              handleSelectAnAnswer(idx);
            }}
            disabled={answerIsSubmitted}
          >
            {answer.text}
          </button>
        ))}
      </div>
    </>
  );
};

export default SingleQuestion;
