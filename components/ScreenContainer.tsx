import { ScreenContainerProps } from "@/types/type";
import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  scrollable = true,
  children,
}) => (
  <SafeAreaView className="flex-1 bg-white">
    {scrollable ? (
      <ScrollView
        className="px-2 py-4"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    ) : (
      <View className="flex-1 px-2 py-4">{children}</View>
    )}
  </SafeAreaView>
);

export default ScreenContainer;
