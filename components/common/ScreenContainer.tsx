import { ScreenContainerProps } from "@/types/type";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  scrollable = true,
  children,
}) => (
  <SafeAreaView className="flex-1 bg-white">
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      className="flex-1"
    >
      {scrollable ? (
        <ScrollView
          className="px-2 py-4"
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 18 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        >
          {children}
        </ScrollView>
      ) : (
        <View className="flex-1 px-2 py-4">{children}</View>
      )}
    </KeyboardAvoidingView>
  </SafeAreaView>
);

export default ScreenContainer;
