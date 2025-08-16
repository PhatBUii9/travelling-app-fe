import DateCard from "@/components/card/DateCard";
import CustomButton from "@/components/common/CustomButton";
import ProgressBar from "@/components/common/PorgressBar";
import ScreenContainer from "@/components/common/ScreenContainer";
import { ROUTES } from "@/constant/routes";
import { useTripPlanner } from "@/hooks/useTripPlanner";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect, useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  getTripById,
  updateTrip as updateTripStorage,
} from "@/utils/tripStorage";
import type { CityBlock, TripDraft } from "@/types/type";

type Params = {
  cityId?: string | string[];
  options?: string; // planner flag ("create")
  mode?: string; // "edit-saved" when editing a persisted trip
  tripId?: string | string[]; // saved trip id
};

const SelectDatesScreen = () => {
  const {
    cityId: rawCityId,
    options,
    mode,
    tripId: rawTripId,
  } = useLocalSearchParams<Params>();

  const cityId = useMemo(
    () => (Array.isArray(rawCityId) ? rawCityId[0] : rawCityId) ?? "",
    [rawCityId],
  );
  const tripId = useMemo(
    () => (Array.isArray(rawTripId) ? rawTripId[0] : rawTripId) ?? "",
    [rawTripId],
  );
  const isEditingSaved = mode === "edit-saved";

  // Planner context (for create flow)
  const { cities, updateCity } = useTripPlanner();
  const currentPlannerCity = cities.find((c) => c.cityId === cityId);

  // Local date picker state
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  // Helper to coerce unknown date-like (ISO string or Date) to Date
  const asDate = (d: string | Date | undefined) =>
    d instanceof Date ? d : d ? new Date(d) : new Date();

  // Preload depending on mode
  useEffect(() => {
    (async () => {
      if (isEditingSaved && tripId && cityId) {
        const trip = await getTripById(tripId);
        const city = trip?.cities?.find((c) => c.cityId === cityId);
        if (city) {
          setStartDate(asDate(city.startDate as any));
          setEndDate(asDate(city.endDate as any));
          return;
        }
      }
      // Planner defaults
      if (currentPlannerCity) {
        setStartDate(asDate(currentPlannerCity.startDate as any));
        setEndDate(asDate(currentPlannerCity.endDate as any));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isEditingSaved,
    tripId,
    cityId,
    currentPlannerCity?.startDate,
    currentPlannerCity?.endDate,
  ]);

  const isInvalidDate = !startDate || !endDate || endDate < startDate;

  const getDaysDiff = (start: Date, end: Date) =>
    Math.max(
      1,
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)),
    );

  // ---- EDIT-SAVED: persist city dates, recompute trip range, then replace -> Restaurants ----
  const saveDatesForSavedTrip = async () => {
    if (!tripId || !cityId) return;
    const trip = await getTripById(tripId);
    if (!trip) return;

    // Update that city's dates; store as ISO to be consistent in storage
    const nextCities: CityBlock[] = (trip.cities || []).map((c: any) =>
      c.cityId === cityId
        ? {
            ...c,
            startDate: startDate.toISOString() as unknown as Date, // cast to satisfy TS for CityBlock
            endDate: endDate.toISOString() as unknown as Date,
          }
        : c,
    );

    // Recompute overall trip range (coerce existing values to Date reliably)
    const times = nextCities.map((c: any) => ({
      s: asDate(c.startDate).getTime(),
      e: asDate(c.endDate).getTime(),
    }));
    const startMs = Math.min(...times.map((t) => t.s));
    const endMs = Math.max(...times.map((t) => t.e));

    await updateTripStorage(tripId, {
      cities: nextCities as any,
      startDate: new Date(startMs).toISOString(),
      endDate: new Date(endMs).toISOString(),
      updatedAt: new Date().toISOString(),
    } as Partial<TripDraft>);

    // Go forward in the chain
    router.replace({
      pathname: ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_RESTAURANTS,
      params: { mode: "edit-saved", tripId, cityId },
    });
  };

  const handleContinue = async () => {
    if (!cityId || isInvalidDate) return;

    if (isEditingSaved) {
      await saveDatesForSavedTrip();
      return;
    }

    // ---- Planner flow: update context then push -> Restaurants ----
    updateCity(cityId, { startDate, endDate });
    if (options !== "create") {
      router.push(ROUTES.ROOT.TRIPS.PLAN_TRIP.TRIP_REVIEW);
    } else {
      router.push({
        pathname: ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_RESTAURANTS,
        params: { cityId, options },
      });
    }
  };

  return (
    <>
      <ProgressBar currentStep={4} totalSteps={6} />
      <ScreenContainer scrollable={false}>
        <View className="my-1 mx-4">
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
                if (isEditingSaved) {
                  // Reset to currently loaded values (already in state)
                  setStartDate(new Date(startDate));
                  setEndDate(new Date(endDate));
                } else {
                  setStartDate(asDate(currentPlannerCity?.startDate as any));
                  setEndDate(asDate(currentPlannerCity?.endDate as any));
                }
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
            className={`rounded-xl ${isInvalidDate ? "bg-gray-300" : "bg-blue-500"}`}
            textVariant="default"
            testID="continue-button"
          />
        </View>
      </ScreenContainer>
    </>
  );
};

export default SelectDatesScreen;
