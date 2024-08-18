interface ReportProps {
  correctAnswers: number;
  totalQuestions: number;
}

const Report = ({ correctAnswers, totalQuestions }: ReportProps) => {
  const scoreAsPercentage = Math.floor((correctAnswers * 100) / totalQuestions);
  return (
    <>
      <p className="report">
        You scored {scoreAsPercentage}% ({correctAnswers}/{totalQuestions})
      </p>
    </>
  );
};

export default Report;
