interface ReturnToQuizSetupBtnProps {
  onClick: () => void;
}

const ReturnToQuizSetupBtn = ({ onClick }: ReturnToQuizSetupBtnProps) => {
  return (
    <button className="back-to-start-btn" onClick={onClick}>
      Back to start
    </button>
  );
};

export default ReturnToQuizSetupBtn;
