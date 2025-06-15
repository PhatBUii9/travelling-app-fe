import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

interface ScreenContainerProps {
  scrollable?: boolean;
  children: React.ReactNode;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  scrollable = true,
  children,
}) => (
  <SafeAreaView className="flex-1 bg-white">
    {scrollable ? (
      <ScrollView
        className="px-4 py-4"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    ) : (
      <View className="flex-1 px-4 py-4">{children}</View>
    )}
  </SafeAreaView>
);

export default ScreenContainer;
