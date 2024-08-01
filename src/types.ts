type Difficulty = "easy" | "medium" | "hard";
type QuestionType = "multiple" | "boolean";

interface ICategoryInfo {
  id: number;
  name: string;
}

interface IQuestionInfo {
  type: QuestionType;
  difficulty: Difficulty;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export type { Difficulty, QuestionType, ICategoryInfo, IQuestionInfo };
