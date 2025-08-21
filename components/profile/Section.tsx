import React from "react";
import { View, Text } from "react-native";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View className="mb-6">
    <Text className="text-base font-JakartaBold text-gray-800 mb-3 px-1">
      {title}
    </Text>
    <View className="bg-white rounded-2xl overflow-hidden border border-gray-100">
      {children}
    </View>
  </View>
);

export default Section;
