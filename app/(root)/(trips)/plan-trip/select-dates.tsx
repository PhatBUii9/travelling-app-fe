import DateCard from "@/components/card/DateCard";
import CustomButton from "@/components/common/CustomButton";
import ProgressBar from "@/components/common/PorgressBar";
import ScreenContainer from "@/components/common/ScreenContainer";
import { ROUTES } from "@/constant/routes";
import { useTripPlanner } from "@/hooks/useTripPlanner";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const SelectDatesScreen = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { cities, currentCityId, updateCity } = useTripPlanner();
  const current = cities.find((c) => c.cityId === currentCityId);

  const isInvalidDate = !startDate || !endDate || endDate < startDate;

  const getDaysDiff = (start: Date, end: Date) =>
    Math.max(
      1,
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)),
    );

  const handleContinue = () => {
    if (!currentCityId || isInvalidDate) return;
    updateCity(currentCityId, { startDate, endDate });
    router.push(ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_RESTAURANTS);
  };

  useEffect(() => {
    if (current) {
      if (current.startDate) setStartDate(new Date(current.startDate));
      if (current.endDate) setEndDate(new Date(current.endDate));
    }
  }, [current]);

  return (
    <>
      <ProgressBar currentStep={4} totalSteps={6} />
      <ScreenContainer scrollable={false}>
        <View className="py-1 px-4">
          <View className="items-center mx-8 mb-8">
            <Text className="font-JakartaExtraBold text-heading-lg mb-3">
              Trip Dates
            </Text>
            <Text className="text-base text-center font-JakartaMedium text-secondary-700">
              Choose a start and end date for your trip.
            </Text>
          </View>
        </View>
        <View className="flex-1 items-center mt-10">
          <DateCard
            title="Start Date"
            value={startDate}
            onChange={setStartDate}
            minDate={new Date()}
          />
          <DateCard
            title="End Date"
            value={endDate}
            onChange={setEndDate}
            minDate={startDate}
          />
          <View className="flex-row justify-center my-2">
            <TouchableOpacity
              className="bg-gray-100 rounded-xl px-4 py-3"
              onPress={() => {
                setStartDate(
                  current?.startDate ? new Date(current.startDate) : new Date(),
                );
                setEndDate(
                  current?.endDate ? new Date(current.endDate) : new Date(),
                );
              }}
            >
              <Text className="text-blue-500 font-JakartaBold">
                Reset Dates
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-gray-100 rounded-xl px-4 py-3 ml-3"
              onPress={() => setEndDate(startDate)}
            >
              <Text className="text-blue-500 font-JakartaBold">
                Clear End Date
              </Text>
            </TouchableOpacity>
          </View>
          {startDate && endDate && !isInvalidDate && (
            <Text className="text-base font-JakartaSemiBold text-center my-2">
              Trip duration: {getDaysDiff(startDate, endDate)} day
              {getDaysDiff(startDate, endDate) > 1 ? "s" : ""}
            </Text>
          )}

          {isInvalidDate && (
            <Text className="text-red-500 text-center my-2">
              End date must be after start date.
            </Text>
          )}
        </View>

        <View className="w-full px-4">
          <CustomButton
            title="Continue"
            onPress={handleContinue}
            disabled={isInvalidDate}
            className={`rounded-xl ${
              isInvalidDate ? "bg-gray-300" : "bg-blue-500"
            }`}
            textVariant="default"
            testID="continue-button"
          />
        </View>
      </ScreenContainer>
    </>
  );
};

export default SelectDatesScreen;
