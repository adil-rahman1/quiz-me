import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

function QuizSetup() {
  return (
    <>
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
    </>
  );
}

export default QuizSetup;
