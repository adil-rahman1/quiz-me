import { Dispatch, SetStateAction } from "react";
import { QuestionType } from "../types";

interface QuestionTypeRadioInputProps {
  setQuestionType: Dispatch<SetStateAction<QuestionType>>;
}

const QuestionTypeRadioInput = ({
  setQuestionType,
}: QuestionTypeRadioInputProps) => {
  const onQuestionTypeChange = (nextVal: string) => {
    setQuestionType(nextVal as QuestionType);
  };

  return (
    <fieldset className="radio-container">
      <div>
        <legend className="legend">Type</legend>
      </div>
      <div className="radio-group">
        <input
          type="radio"
          name="questionType"
          id="multiple"
          value="multiple"
          defaultChecked={true}
          onChange={(e) => onQuestionTypeChange(e.target.value)}
        />
        <label className="label" htmlFor="multiple">
          Multiple
        </label>

        <input
          type="radio"
          name="questionType"
          id="boolean"
          value="boolean"
          onChange={(e) => onQuestionTypeChange(e.target.value)}
        />
        <label className="label" htmlFor="boolean">
          True or False
        </label>
      </div>
    </fieldset>
  );
};

export default QuestionTypeRadioInput;
