import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const Row = ({
  icon,
  title,
  subtitle,
  onPress,
  danger = false,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  danger?: boolean;
  children?: React.ReactNode;
}) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={onPress}
    className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100"
  >
    <View className="flex-row items-center">
      <View className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center mr-3">
        {icon}
      </View>
      <View>
        <Text
          className={`text-[15px] font-JakartaSemiBold ${
            danger ? "text-red-600" : "text-gray-900"
          }`}
        >
          {title}
        </Text>
        {!!subtitle && (
          <Text className="text-xs text-gray-500 mt-0.5">{subtitle}</Text>
        )}
      </View>
    </View>

    <View className="flex-row items-center">
      {children}
      {!children && (
        <Icon
          name="chevron-right"
          size={18}
          color={danger ? "#DC2626" : "#9CA3AF"}
        />
      )}
    </View>
  </TouchableOpacity>
);

export default Row;
