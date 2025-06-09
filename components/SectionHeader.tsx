// components/SectionHeader.tsx
import React, { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface SectionHeaderProps {
  title: string;
  onPress: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = React.memo(
  ({ title, onPress }) => {
    return (
      <View className="flex-1 flex-row justify-between items-center my-3">
        <Text className="text-heading-sm font-JakartaBold">{title}</Text>
        <TouchableOpacity onPress={onPress}>
          <Text className="text-xs text-secondary-500">See more</Text>
        </TouchableOpacity>
      </View>
    );
  }
);

export default SectionHeader;
