type DifficultyType = "easy" | "medium" | "hard";
type QuestionType = "multiple" | "boolean";
type QuizStatusType = "notStarted" | "inProgress" | "completed";

interface ICategoryInfo {
  id: number;
  name: string;
}

interface IQuestionInfo {
  type: QuestionType;
  difficulty: DifficultyType;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface IAnswerInfo {
  isCorrect: boolean;
  text: string;
}

export type {
  DifficultyType,
  QuestionType,
  QuizStatusType,
  ICategoryInfo,
  IQuestionInfo,
  IAnswerInfo,
};
