import React, { useMemo } from "react";
import { View, Text } from "react-native";

const Avatar = ({ name }: { name?: string }) => {
  const initials = useMemo(() => {
    if (!name) return "U";
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] ?? "";
    const second = parts[1]?.[0] ?? "";
    return (first + second).toUpperCase() || "U";
  }, [name]);

  return (
    <View className="w-16 h-16 rounded-full bg-blue-100 items-center justify-center">
      <Text className="text-xl font-JakartaBold text-blue-600">{initials}</Text>
    </View>
  );
};

export default Avatar;
