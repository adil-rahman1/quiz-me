import { IReturnToQuizSetupBtnProps } from "../types";

const ReturnToQuizSetupBtn = ({ onClick }: IReturnToQuizSetupBtnProps) => {
  return (
    <button className="back-to-start-btn" onClick={onClick}>
      Back to start
    </button>
  );
};

export default ReturnToQuizSetupBtn;
