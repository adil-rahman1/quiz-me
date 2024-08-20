import { Dispatch, SetStateAction } from "react";
import { DifficultyType } from "../types";

interface DifficultyRadioInputProps {
  setDifficulty: Dispatch<SetStateAction<DifficultyType>>;
}

const DifficultyRadioInput = ({ setDifficulty }: DifficultyRadioInputProps) => {
  const onDifficultyChange = (nextVal: string) => {
    setDifficulty(nextVal as DifficultyType);
  };

  return (
    <fieldset>
      <legend>Select difficulty</legend>

      <input
        type="radio"
        name="difficulty"
        id="easy"
        value="easy"
        onChange={(e) => onDifficultyChange(e.target.value)}
      />
      <label htmlFor="easy">Easy</label>
      <br />

      <input
        type="radio"
        name="difficulty"
        id="medium"
        value="medium"
        onChange={(e) => onDifficultyChange(e.target.value)}
      />
      <label htmlFor="medium">Medium</label>
      <br />

      <input
        type="radio"
        name="difficulty"
        id="hard"
        value="hard"
        onChange={(e) => onDifficultyChange(e.target.value)}
      />
      <label htmlFor="hard">Hard</label>
    </fieldset>
  );
};

export default DifficultyRadioInput;
