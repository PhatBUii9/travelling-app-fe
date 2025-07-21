import React from "react";
import TripSummaryHeader from "@/components/trip/trip-review/TripSummaryHeader";
import TripTitleEditModal from "@/components/trip/trip-review/TripTitleEditModal";
import { useState } from "react";
import { useTripPlanner } from "@/hooks/useTripPlanner";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import ScreenContainer from "@/components/common/ScreenContainer";
import { FlatList } from "react-native-actions-sheet";
import { CityBlock } from "@/types/type";
import TripCityBlock from "@/components/trip/trip-review/TripCityBlock";
import BottomStickyButton from "@/components/common/BottomStickyButton";
import { router } from "expo-router";
import { ROUTES } from "@/constant/routes";
import CustomButton from "@/components/common/CustomButton";

const TripReview = () => {
  const { tripTitle, setTripTitle } = useTripPlanner();
  const [editOpen, setEditOpen] = useState(false);
  const { cities } = useTripPlanner();
  const [confirmDisabled, setConfirmDisabled] = useState(false);

  const onConfirm = () => {};

  const onDiscard = () => {};

  const onAddCity = () => {
    router.push(ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_CITY);
  };

  return (
    <>
      <View className="my-6">
        <Text className="font-JakartaExtraBold text-heading-lg text-center">
          Review Trip
        </Text>
      </View>
      <SafeAreaView className="flex-1 mx-8 mb-16 bg-white rounded-3xl">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "padding"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
          className="flex-1"
        >
          <View className="flex-1 px-2 py-4">
            <FlatList
              data={cities}
              keyExtractor={(item) => (item as any).id}
              ItemSeparatorComponent={() => <View className="h-3" />}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={TripSummaryHeader}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 16,
                paddingTop: 8,
              }}
              renderItem={({ item }: { item: CityBlock }) => (
                <TripCityBlock
                  name={item.cityName}
                  startDate={item.startDate}
                  endDate={item.endDate}
                />
              )}
              ListEmptyComponent={() => (
                <View className="flex-1">
                  <Text className="w-full items-center mt-8">
                    No city found
                  </Text>
                </View>
              )}
              ListFooterComponent={() => (
                <TouchableOpacity
                  className="justify-center items-center"
                  onPress={onAddCity}
                >
                  <Text className="text-primary-600">+ Add Another City</Text>
                </TouchableOpacity>
              )}
            />
            <View className="flex-row justify-between px-4 pb-4">
              <CustomButton
                title="Discard"
                onPress={onDiscard}
                className="rounded-xl flex-1 mr-2"
                textVariant="primary"
                bgVariant="google"
              />
              <CustomButton
                title="Confirm"
                onPress={onConfirm}
                disabled={confirmDisabled}
                className={`rounded-xl flex-1 ml-2 ${confirmDisabled ? "bg-gray-300" : "bg-blue-500"}`}
                textVariant="default"
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default TripReview;
