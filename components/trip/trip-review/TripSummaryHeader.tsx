import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useForm } from "react-hook-form";
import Icon from "react-native-vector-icons/FontAwesome";

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
