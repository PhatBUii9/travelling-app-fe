import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface TripSummaryHeaderProps {
  title: string;
  subtitle: string;
  onEdit: () => void;
  showEdit?: boolean;
  headerClassName?: string;
}

const TripSummaryHeader: React.FC<TripSummaryHeaderProps> = ({
  title,
  subtitle,
  onEdit,
  headerClassName,
}) => {
  return (
    <View className={headerClassName}>
      <View className="flex-row items-center">
        <Text className="text-heading-md font-JakartaBold mr-5">{title}</Text>
        <TouchableOpacity onPress={onEdit} accessibilityLabel="Edit date">
          <Icon name="edit" size={16} color="#000" />
        </TouchableOpacity>
      </View>
      <View className="flex-row">
        <Text className="text-base font-JakartaSemiBold text-secondary-600 mb-8 mt-2">
          {subtitle}
        </Text>
      </View>
    </View>
  );
};

export default TripSummaryHeader;
