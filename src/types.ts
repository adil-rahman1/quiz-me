type QuizStatusType = "notStarted" | "inProgress" | "completed";
type DifficultyType = "easy" | "medium" | "hard";
type QuestionType = "multiple" | "boolean";

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

interface IQuizSetupProps {
  setAllQuestions: React.Dispatch<React.SetStateAction<IQuestionInfo[]>>;
  setQuizStatus: React.Dispatch<React.SetStateAction<QuizStatusType>>;
}

interface INumberInputProps {
  numberOfQuestions: number;
  setNumberOfQuestions: React.Dispatch<React.SetStateAction<number>>;
}

interface IDifficultyRadioInputProps {
  setDifficulty: React.Dispatch<React.SetStateAction<DifficultyType>>;
}

interface IQuestionTypeRadioInputProps {
  setQuestionType: React.Dispatch<React.SetStateAction<QuestionType>>;
}

interface ICategoryInputProps {
  setSelectedCategoryInfo: React.Dispatch<
    React.SetStateAction<ICategoryInfo | null>
  >;
}

interface IQuizDisplayProps {
  allQuestions: IQuestionInfo[];
  setQuizStatus: React.Dispatch<React.SetStateAction<QuizStatusType>>;
  noOfCorrectAnswers: React.MutableRefObject<number>;
  handleReturnToQuizSetup: () => void;
}

interface ISingleQuestionProps {
  questionInfo: IQuestionInfo;
  selectedAnswer: number | null;
  setSelectedAnswer: React.Dispatch<React.SetStateAction<number | null>>;
  answerIsSubmitted: boolean;
  allAnswers: IAnswerInfo[];
  setAllAnswers: React.Dispatch<React.SetStateAction<IAnswerInfo[]>>;
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
  QuizStatusType,
  DifficultyType,
  QuestionType,
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
