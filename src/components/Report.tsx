import ReturnToQuizSetupBtn from "./ReturnToQuizSetupBtn";

interface ReportProps {
  correctAnswers: number;
  totalQuestions: number;
  handleReturnToQuizSetup: () => void;
}

const Report = ({
  correctAnswers,
  totalQuestions,
  handleReturnToQuizSetup,
}: ReportProps) => {
  const scoreAsPercentage = Math.floor((correctAnswers * 100) / totalQuestions);
  return (
    <div className="report">
      <p>
        You scored {scoreAsPercentage}% ({correctAnswers}/{totalQuestions})
      </p>
      <ReturnToQuizSetupBtn
        onClick={handleReturnToQuizSetup}
      ></ReturnToQuizSetupBtn>
    </div>
  );
};

export default Report;
