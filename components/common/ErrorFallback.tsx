import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface ErrorFallbackProps {
  onPress: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = React.memo(
  ({ onPress }) => {
    return (
      <View className="flex-1 justify-center items-center px-4 bg-white">
        <Icon
          name="warning"
          size={24}
          color="#F56565"
          style={{ marginBottom: 12 }}
        />
        <Text className="text-lg font-JakartaBold text-danger-600 mb-2">
          Failed to load trips
        </Text>
        <Text className="text-base text-secondary-600 text-center mb-6">
          Please check your connection and try again
        </Text>
        <TouchableOpacity
          onPress={onPress}
          className="bg-primary-500 py-2 px-6 rounded-lg items-center shadow-md"
          accessibilityRole="button"
          accessibilityLabel="Retry loading trips"
          testID="retry-button"
        >
          <Text className="text-white font-JakartaSemiBold text-base">
            Retry
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
);

export default ErrorFallback;
