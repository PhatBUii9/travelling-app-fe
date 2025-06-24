import { View, Text, Dimensions } from "react-native";

type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
  showLabel?: boolean;
};

const ProgressBar = ({
  currentStep,
  totalSteps,
  showLabel = true,
}: ProgressBarProps) => {
  const screenWidth = Dimensions.get("window").width;
  const progressWidth = (screenWidth * currentStep) / totalSteps;

  return (
    <View className="px-4 mb-2">
      {showLabel && (
        <Text className="text-xs text-secondary-500 mb-1 font-JakartaMedium">
          Step {currentStep} of {totalSteps}
        </Text>
      )}
      <View className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <View
          className="h-2 bg-blue-500 rounded-full"
          style={{ width: progressWidth }}
        />
      </View>
    </View>
  );
};

export default ProgressBar;
