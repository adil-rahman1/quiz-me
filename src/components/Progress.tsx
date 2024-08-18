import { Progress } from "@chakra-ui/react";

const ProgressDisplay = ({ progress }: { progress: number }) => {
  return <Progress value={progress} />;
};

export default ProgressDisplay;
