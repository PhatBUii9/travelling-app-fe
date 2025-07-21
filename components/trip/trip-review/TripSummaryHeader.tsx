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
  return <View></View>;
};

export default TripSummaryHeader;
