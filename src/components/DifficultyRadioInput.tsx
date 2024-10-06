import { IDifficultyRadioInputProps, Difficulty } from "../types";

const DifficultyRadioInput = ({
  setDifficulty,
}: IDifficultyRadioInputProps) => {
  const onDifficultyChange = (nextVal: string) => {
    setDifficulty(nextVal as Difficulty);
  };

  return (
    <fieldset className="radio-container">
      <div>
        <legend className="legend">Difficulty</legend>
      </div>
      <div className="radio-group">
        <div className="radio-item">
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
        </div>
        <div className="radio-item">
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
        </div>
        <div className="radio-item">
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
      </div>
    </fieldset>
  );
};

export default DifficultyRadioInput;
