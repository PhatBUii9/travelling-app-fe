// components/SectionHeader.tsx
import React from "react";
import { Text, View } from "react-native";

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <View className="my-3">
      <Text className="text-heading-sm font-JakartaBold">{title}</Text>
    </View>
  );
};

export default SectionHeader;
