import { IReportProps } from "../types";
import ReturnToQuizSetupBtn from "./ReturnToQuizSetupBtn";

const Report = ({
  noOfCorrectAnswers,
  totalQuestions,
  handleReturnToQuizSetup,
}: IReportProps) => {
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
