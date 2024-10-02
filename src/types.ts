type QuizStatus = "notStarted" | "inProgress" | "completed";
type Difficulty = "easy" | "medium" | "hard";
type Question = "multiple" | "boolean";

interface ICategoryInfo {
  id: number;
  name: string;
}

interface IQuestionInfo {
  type: Question;
  difficulty: Difficulty;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface IAnswerInfo {
  isCorrect: boolean;
  text: string;
}

interface IQuizSetupProps {
  setQuestions: React.Dispatch<React.SetStateAction<IQuestionInfo[]>>;
  setQuizStatus: React.Dispatch<React.SetStateAction<QuizStatus>>;
}

interface INumberInputProps {
  numberOfQuestions: number;
  setNumberOfQuestions: React.Dispatch<React.SetStateAction<number>>;
}

interface IDifficultyRadioInputProps {
  setDifficulty: React.Dispatch<React.SetStateAction<Difficulty>>;
}

interface IQuestionTypeRadioInputProps {
  setQuestionType: React.Dispatch<React.SetStateAction<Question>>;
}

interface ICategoryInputProps {
  setSelectedCategoryInfo: React.Dispatch<
    React.SetStateAction<ICategoryInfo | null>
  >;
}

interface IQuizDisplayProps {
  questions: IQuestionInfo[];
  setQuizStatus: React.Dispatch<React.SetStateAction<QuizStatus>>;
  setNoOfCorrectAnswers: React.Dispatch<React.SetStateAction<number>>;
  handleReturnToQuizSetup: () => void;
}

interface ISingleQuestionProps {
  questionInfo: IQuestionInfo;
  selectedAnswer: number | null;
  setSelectedAnswer: React.Dispatch<React.SetStateAction<number | null>>;
  isAnswerSubmitted: boolean;
  answers: IAnswerInfo[];
  setAnswers: React.Dispatch<React.SetStateAction<IAnswerInfo[]>>;
  currentQNo: number;
  totalQuestions: number;
}

interface IReturnToQuizSetupBtnProps {
  onClick: () => void;
}

interface IReportProps {
  noOfCorrectAnswers: number;
  totalQuestions: number;
  handleReturnToQuizSetup: () => void;
}

export type {
  QuizStatus,
  Difficulty,
  Question,
  ICategoryInfo,
  IQuestionInfo,
  IAnswerInfo,
  IQuizSetupProps,
  INumberInputProps,
  IDifficultyRadioInputProps,
  IQuestionTypeRadioInputProps,
  ICategoryInputProps,
  IQuizDisplayProps,
  ISingleQuestionProps,
  IReturnToQuizSetupBtnProps,
  IReportProps,
};
