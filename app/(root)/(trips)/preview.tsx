import React from "react";
import { View, Image, Text } from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import ScreenContainer from "@/components/ScreenContainer";
import CustomButton from "@/components/CustomButton";

export default function Preview() {
  const { title, destination, startDate, endDate, description, imageUrl } =
    useLocalSearchParams<{
      title: string;
      destination: string;
      startDate: string;
      endDate: string;
      description?: string;
      imageUrl?: string;
    }>();

  const from = new Date(startDate);
  const to = new Date(endDate);

  const convertDateToString = (date: Date) =>
    date.toLocaleDateString("en-AU", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const onCancelPress = () => router.back();
  const onConfirmPress = () => {
    /* confirm action */
  };

  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerRight: () => {} }} />
      <View className="px-4 pt-4">
        <View
          className="rounded-3xl overflow-hidden"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Image
            source={{ uri: imageUrl }}
            className="w-full aspect-[16/9]"
            resizeMode="cover"
            accessibilityLabel="Cover Image"
          />
        </View>
      </View>

      <View className="px-8 pt-8 flex-1">
        {/* Title */}
        <Text className="text-heading-lg font-JakartaBold">{title}</Text>
        <Text className="text-xl font-JakartaMedium text-secondary-500 mb-6">
          {destination}
        </Text>

        {/* Dates */}
        <View className="space-y-3 mb-6">
          <View className="flex-row items-center">
            <Text className="text-md font-JakartaSemiBold">Start Date:</Text>
            <Text className="ml-2 text-md font-JakartaMedium text-secondary-500">
              {convertDateToString(from)}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-md font-JakartaSemiBold">End Date:</Text>
            <Text className="ml-2 text-md font-JakartaMedium text-secondary-500">
              {convertDateToString(to)}
            </Text>
          </View>
        </View>

        {/* Description */}
        <Text className="text-heading-sm font-JakartaBold mb-2">
          Description
        </Text>
        <Text className="text-md font-JakartaMedium text-secondary-700 mb-8">
          {description ?? "N/A"}
        </Text>
      </View>

      {/* Actions */}
      <View className="px-4 pb-4 flex-row space-x-4">
        <CustomButton
          title="Cancel"
          onPress={onCancelPress}
          bgVariant="outline"
          textVariant="primary"
          className="flex-1 rounded-xl"
          accessibilityRole="button"
        />
        <CustomButton
          title="Confirm"
          onPress={onConfirmPress}
          className="flex-1 rounded-xl"
          accessibilityRole="button"
          accessibilityLabel="Confirm trip"
        />
      </View>
    </ScreenContainer>
  );
}
