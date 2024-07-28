import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Radio,
  RadioGroup,
  Stack,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";

type Difficulty = "easy" | "medium" | "hard";

function QuizSetup() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");

  return (
    <>
      <HStack spacing="24px">
        <NumberInput
          size="sm"
          maxW={20}
          defaultValue={10}
          min={10}
          max={50}
          step={5}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        <RadioGroup
          onChange={(nextVal: string) => setDifficulty(nextVal as Difficulty)}
          value={difficulty}
        >
          <Stack direction="row">
            <Radio value="easy">Easy</Radio>
            <Radio value="medium">Medium</Radio>
            <Radio value="hard">Hard</Radio>
          </Stack>
        </RadioGroup>
      </HStack>
    </>
  );
}

export default QuizSetup;
