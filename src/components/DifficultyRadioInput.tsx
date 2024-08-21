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
    <fieldset className="radio-container">
      <div>
        <legend className="legend">Difficulty</legend>
      </div>
      <div className="radio-group">
        <input
          type="radio"
          name="difficulty"
          id="easy"
          value="easy"
          defaultChecked={true}
          onChange={(e) => onDifficultyChange(e.target.value)}
        />
        <label className="label" htmlFor="easy">
          Easy
        </label>
        <br />

        <input
          type="radio"
          name="difficulty"
          id="medium"
          value="medium"
          onChange={(e) => onDifficultyChange(e.target.value)}
        />
        <label className="label" htmlFor="medium">
          Medium
        </label>
        <br />

        <input
          type="radio"
          name="difficulty"
          id="hard"
          value="hard"
          onChange={(e) => onDifficultyChange(e.target.value)}
        />
        <label className="label" htmlFor="hard">
          Hard
        </label>
      </div>
    </fieldset>
  );
};

export default DifficultyRadioInput;
