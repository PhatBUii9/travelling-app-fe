import { SectionHeaderProps } from "@/types/type";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const SectionHeader: React.FC<SectionHeaderProps> = React.memo(
  ({ title, onPress, canSeeMore }) => {
    return (
      <View className="flex-1 flex-row justify-between items-center my-3">
        <Text className="text-heading-sm font-JakartaBold">{title}</Text>
        {canSeeMore ? (
          <TouchableOpacity onPress={onPress}>
            <Text className="text-xs text-secondary-500">See more</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
);

export default SectionHeader;
