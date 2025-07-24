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
  Alert,
} from "react-native";
import { FlatList } from "react-native-actions-sheet";
import { CityBlock } from "@/types/type";
import TripCityBlock from "@/components/trip/trip-review/TripCityBlock";
import { router } from "expo-router";
import { ROUTES } from "@/constant/routes";
import CustomButton from "@/components/common/CustomButton";

const TripReview = () => {
  const { tripTitle, setTripTitle } = useTripPlanner();
  const [editOpen, setEditOpen] = useState(false);
  const { cities, resetTrip } = useTripPlanner();
  const confirmDisabled = cities.length === 0;

  const onConfirm = () => {
    if (cities.length === 0) return;
    console.log(cities);
    resetTrip();
    router.push(ROUTES.ROOT.TABS.DASHBOARD);
  };

  const onDiscard = () => {
    console.log("onDiscard called");
    Alert.alert("Discard Trip", "Do you want to discard your trips?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        style: "destructive",
        onPress: () => {
          console.log("Ok Pressed");
          resetTrip();
          //router.push(ROUTES.ROOT.TABS.DASHBOARD);
        },
      },
    ]);
  };

  console.log(cities);

  const onAddCity = () => {
    router.push(ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_CITY);
  };

  return (
    <>
      <SafeAreaView className="flex-1 mx-2 mb-3 rounded-3xl">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "padding"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
          className="flex-1"
        >
          <View className="flex-1 px-2 mt-5">
            <FlatList
              data={cities}
              keyExtractor={(item) => item.cityId}
              ItemSeparatorComponent={() => <View className="h-5" />}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={() => (
                <TripSummaryHeader title="Trip" subtitle="trip" />
              )}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 16,
                paddingTop: 8,
              }}
              renderItem={({ item }: { item: CityBlock }) => (
                <TripCityBlock
                  cityName={item.cityName}
                  country={item.country}
                  startDate={item.startDate}
                  endDate={item.endDate}
                  activities={item.activities}
                  restaurants={item.restaurants}
                  accommodations={item.accommodations}
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
                <View>
                  <TouchableOpacity
                    className="justify-center items-center mt-3 mb-5"
                    onPress={onAddCity}
                  >
                    <Text className="text-primary-600">+ Add Another City</Text>
                  </TouchableOpacity>
                  <View className="flex-row justify-between px-4">
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
              )}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default TripReview;
