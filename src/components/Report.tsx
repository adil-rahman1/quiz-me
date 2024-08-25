import ReturnToQuizSetupBtn from "./ReturnToQuizSetupBtn";

interface ReportProps {
  noOfCorrectAnswers: number;
  totalQuestions: number;
  handleReturnToQuizSetup: () => void;
}

const Report = ({
  noOfCorrectAnswers,
  totalQuestions,
  handleReturnToQuizSetup,
}: ReportProps) => {
  const scoreAsPercentage = Math.floor(
    (noOfCorrectAnswers * 100) / totalQuestions
  );
  return (
    <div className="report">
      <p>
        You scored {scoreAsPercentage}% ({noOfCorrectAnswers}/{totalQuestions})
      </p>
      <ReturnToQuizSetupBtn
        onClick={handleReturnToQuizSetup}
      ></ReturnToQuizSetupBtn>
    </div>
  );
};

export default Report;
