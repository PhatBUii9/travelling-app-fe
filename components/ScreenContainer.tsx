// components/ScreenContainer.tsx
import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

interface ScreenContainerProps {
  scrollable?: boolean;
  className?: string;
  children: React.ReactNode;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  scrollable = true,
  className = "",
  children,
}) => {
  return (
    <SafeAreaView className={` bg-white ${className}`}>
      {scrollable ? (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}
          className="px-4 py-4"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View className="flex-1 px-4 py-4">{children}</View>
      )}
    </SafeAreaView>
  );
};

export default ScreenContainer;
