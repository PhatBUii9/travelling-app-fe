import { useCardDimensions } from "@/hooks/useCardDimensions";
import { EmptyStateCardProps } from "@/types/type";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const EmptyStateCard: React.FC<EmptyStateCardProps> = ({
  message,
  onRetry,
}) => {
  const { cardWidth, cardHeight } = useCardDimensions();

  return (
    <View
      className="bg-gray-50 rounded-2xl shadow-md shadow-gray-200 p-4 mr-3"
      style={{ width: cardWidth, height: cardHeight }}
    >
      <View className="flex-1 justify-center items-center">
        <Icon
          name="exclamation-triangle"
          size={28}
          color="#F56565"
          style={{ marginBottom: 16 }}
        />
        <Text className="text-base font-JakartaBold text-danger-700 mb-2">
          {message}
        </Text>
        <TouchableOpacity
          onPress={onRetry}
          className="bg-primary-500 py-1 px-4 rounded-lg"
          testID="retry-inline"
        >
          <Text className="text-white font-JakartaSemiBold text-sm">Retry</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmptyStateCard;
