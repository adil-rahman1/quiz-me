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
    <form>
      <fieldset>
        <legend>Select difficulty</legend>

        <input
          type="radio"
          name="difficulty"
          id="multiple"
          value="multiple"
          onChange={(e) => onQuestionTypeChange(e.target.value)}
        />
        <label htmlFor="multiple">Multiple</label>
        <br />

        <input
          type="radio"
          name="difficulty"
          id="boolean"
          value="boolean"
          onChange={(e) => onQuestionTypeChange(e.target.value)}
        />
        <label htmlFor="boolean">True or False</label>
        <br />
      </fieldset>
    </form>
  );
};

export default QuestionTypeRadioInput;
