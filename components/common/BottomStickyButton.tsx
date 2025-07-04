// components/common/StickyFooter.tsx
import { View, Text } from "react-native";
import CustomButton from "./CustomButton";

type Props = {
  title: string;
  onPress: () => void;
  error?: string;
};

const BottomStickyButton = ({ title, onPress, error }: Props) => (
  <View className="w-full px-4 pb-4">
    <CustomButton
      title={title}
      onPress={onPress}
      disabled={!!error}
      className={`rounded-xl ${error ? "bg-gray-300" : "bg-blue-500"}`}
      textVariant="default"
    />
    {!!error && (
      <Text className="text-sm text-red-500 text-center mt-2">{error}</Text>
    )}
  </View>
);

export default BottomStickyButton;
