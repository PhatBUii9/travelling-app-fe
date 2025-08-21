import React from "react";
import { View, Text } from "react-native";

const Stat = ({ label, value }: { label: string; value: number | string }) => (
  <View className="flex-1 bg-white rounded-2xl px-4 py-4 mr-3 last:mr-0 items-center border border-gray-100">
    <Text className="text-xl font-JakartaBold text-gray-900">{value}</Text>
    <Text className="text-xs text-gray-500 mt-1">{label}</Text>
  </View>
);

export default Stat;
