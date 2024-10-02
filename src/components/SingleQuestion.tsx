import { ISingleQuestionProps, IAnswerInfo } from "../types";
import shuffle from "../shuffleArray";
import { useEffect } from "react";
import decodeHtml from "../decodeHtml";

const SingleQuestion = ({
  questionInfo,
  selectedAnswer,
  setSelectedAnswer,
  answerIsSubmitted,
  answers,
  setAnswers,
  currentQNo,
  totalQuestions,
}: ISingleQuestionProps) => {
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

    setAnswers(
      answersAsAnswerInfoList.length === 2
        ? answersAsAnswerInfoList
        : shuffle(answersAsAnswerInfoList)
    );
  }, [questionInfo]);

  const handleSelectAnAnswer = (idx: number) => {
    setSelectedAnswer(selectedAnswer === idx ? null : idx);
  };

  const getClass = (idx: number) => {
    const classes = ["answer-btn"];
    const isSelected = selectedAnswer === idx;
    const isCorrect = answers[idx].isCorrect;
    const isSelectedCorrect =
      selectedAnswer !== null && answers[selectedAnswer]?.isCorrect;

    if (isSelected) {
      classes.push("selected-answer-btn");
    }

    if (answerIsSubmitted) {
      classes.push("locked");

      if (isSelected && !isSelectedCorrect) {
        classes.push("incorrect-answer-btn");
      }

      if (isCorrect) {
        classes.push("correct-answer-btn");
      }
    }

    return classes.join(" ");
  };

  return (
    <>
      <div className="question-container">
        <h1 className="progress">
          Question <span className="question-number">{currentQNo + 1}</span>/
          {totalQuestions}
        </h1>
        <p className="question-text">{decodeHtml(questionInfo.question)}</p>
      </div>
      <div className="answer-grid-container">
        {answers.map((answer, idx) => (
          <button
            className={getClass(idx)}
            type="button"
            key={idx}
            onClick={() => {
              handleSelectAnAnswer(idx);
            }}
            disabled={answerIsSubmitted}
          >
            {decodeHtml(answer.text)}
          </button>
        ))}
      </div>
    </>
  );
};

export default SingleQuestion;
