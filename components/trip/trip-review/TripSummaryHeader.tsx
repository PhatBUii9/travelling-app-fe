import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface TripSummaryHeaderProps {
  title: string;
  subtitle: string;
  onEdit?: () => void;
  showEdit?: boolean;
}

const TripSummaryHeader: React.FC<TripSummaryHeaderProps> = ({
  title,
  subtitle,
  onEdit,
  showEdit = true,
}) => {
  return (
    <View className="flex-row items-center justify-between mb-4 px-1">
      <View className="flex-1">
        <Text className="text-heading-lg font-JakartaExtraBold mb-1">
          {title}
        </Text>
        <Text className="text-base text-secondary-700 font-JakartaMedium">
          {subtitle}
        </Text>
      </View>
      {showEdit && (
        <TouchableOpacity
          onPress={onEdit}
          className="ml-4"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text className="text-primary-500 text-base font-JakartaBold">
            Edit
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TripSummaryHeader;
