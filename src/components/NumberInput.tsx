import { Dispatch, SetStateAction } from "react";

interface NumberInputProps {
  numberOfQuestions: number;
  setNumberOfQuestions: Dispatch<SetStateAction<number>>;
}

const NumberInput = ({
  numberOfQuestions,
  setNumberOfQuestions,
}: NumberInputProps) => {
  return (
    <div>
      <label htmlFor="numberOfQuestions">Number of questions</label>
      <input
        id="numberOfQuestions"
        type="number"
        defaultValue={numberOfQuestions}
        min={10}
        max={50}
        step={5}
        onChange={(e) => {
          setNumberOfQuestions(parseInt(e.target.value));
        }}
      ></input>
    </div>
  );
};

export default NumberInput;
