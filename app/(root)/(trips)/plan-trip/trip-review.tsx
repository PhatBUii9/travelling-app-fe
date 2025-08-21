// TripReview.tsx
import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  LayoutAnimation,
  UIManager,
} from "react-native";
import { FlatList } from "react-native";
import { useTripPlanner } from "@/hooks/useTripPlanner";
import { useLoading } from "@/contexts/LoadingContext";
import { RelativePathString, router } from "expo-router";
import { ROUTES } from "@/constant/routes";
import { CityBlock } from "@/types/type";
import TripSummaryHeader from "@/components/trip/trip-review/TripSummaryHeader";
import TripTitleEditModal from "@/components/trip/trip-review/TripTitleEditModal";
import TripCityBlock from "@/components/trip/trip-review/TripCityBlock";
import CustomButton from "@/components/common/CustomButton";
import { addTrip } from "@/utils/tripStorage";
import { v4 as uuidv4 } from "uuid";
import { withLoading } from "@/utils/withLoading";
import {
  TripSchema,
  toCityForValidation,
  getZodErrorMessages,
} from "@/validation/trip";

type EditCityProps = {
  cityId: string;
  type: "activity" | "restaurant" | "accommodation" | "date";
};

const SECTION_ROUTES: Record<EditCityProps["type"], RelativePathString> = {
  activity: ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_ACTIVITIES,
  restaurant: ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_RESTAURANTS,
  accommodation: ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_ACCOMMODATION,
  date: ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_DATES,
};

export default function TripReview() {
  const { tripTitle, setTripTitle, cities, resetTrip, removeCity } =
    useTripPlanner();
  const { showLoading, hideLoading } = useLoading();

  const [editOpen, setEditOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // Enable LayoutAnimation on Android
  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  // Compute overall date range (timestamps)
  const { earliestTs, latestTs } = useMemo(() => {
    if (cities.length === 0) return { earliestTs: 0, latestTs: 0 };
    const stamps = cities.flatMap((c) => [
      new Date(c.startDate).getTime(),
      new Date(c.endDate).getTime(),
    ]);
    return {
      earliestTs: Math.min(...stamps),
      latestTs: Math.max(...stamps),
    };
  }, [cities]);

  // Format date as "1 June 2025"
  const formatDate = (ts: number) =>
    new Date(ts).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const hasDates = cities.length > 0;
  const dateRangeLabel = hasDates
    ? `${formatDate(earliestTs)} – ${formatDate(latestTs)}`
    : "";

  const noOfCities = cities.length;
  const cityCountLabel = `${noOfCities} ${noOfCities > 1 ? "cities" : "city"}`;

  // Subtitle: "1 Jun 2025 – 5 Jun 2025 · 3 cities"
  const subtitle = hasDates
    ? `${dateRangeLabel} · ${cityCountLabel}`
    : cityCountLabel;

  // Valid if at least one city has an activity
  const isValid = cities.some((city) => city.activities.length > 0);

  // Navigate to add/edit flows
  const pushSection = (
    type: EditCityProps["type"],
    options: "add" | "edit",
    cityId: string,
  ) => {
    router.push({
      pathname: SECTION_ROUTES[type],
      params: { options, cityId },
    });
  };

  const handleAddSection = (props: EditCityProps) =>
    pushSection(props.type, "add", props.cityId);

  const handleEditSection = (props: EditCityProps) =>
    pushSection(props.type, "edit", props.cityId);

  const handleDelete = (cityId: string) => {
    Alert.alert("Remove City", "Do you want to remove this city?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        style: "destructive",
        onPress: () => removeCity(cityId),
      },
    ]);
  };

  const handleToggleExpand = (cityId: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setExpanded((prev) => ({ ...prev, [cityId]: !prev[cityId] }));
  };

  const handleConfirm = () => {
    // Keep your existing quick checks for UX
    if (!isValid) return;
    if (!tripTitle) {
      Alert.alert("Please enter a title for your trip");
      return;
    }

    // Build dates for validation (global start/end = min/max over city dates)
    const parsedCities = cities.map(toCityForValidation);
    if (parsedCities.length === 0) {
      Alert.alert("Please add at least one city");
      return;
    }
    const globalStart = new Date(
      Math.min(...parsedCities.map((c) => c.startDate.getTime())),
    );
    const globalEnd = new Date(
      Math.max(...parsedCities.map((c) => c.endDate.getTime())),
    );

    // Validate with Zod
    const validateResult = TripSchema.safeParse({
      title: tripTitle,
      startDate: globalStart,
      endDate: globalEnd,
      cities: parsedCities,
    });

    if (!validateResult.success) {
      Alert.alert(
        "Please fix these issues",
        getZodErrorMessages(validateResult.error),
      );
      return;
    }

    // If we reach here, schema validation passed — proceed with your confirm flow
    Alert.alert("Confirm Trip", "Do you want to create this trip?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        style: "default",
        onPress: async () => {
          await withLoading(
            async () => {
              const newTripId = uuidv4();
              await addTrip({
                id: newTripId,
                title: tripTitle,
                createdAt: new Date().toISOString(),
                startDate: globalStart.toISOString(),
                endDate: globalEnd.toISOString(),
                cities, // store original (your storage shape), not converted Dates
              });
              router.push(ROUTES.ROOT.TABS.DASHBOARD);
              resetTrip(); // keeps your “reopen Plan is clean” requirement
            },
            showLoading,
            hideLoading,
          );
        },
      },
    ]);
  };

  const handleDiscard = () => {
    Alert.alert("Discard Trip", "Do you want to discard your trip?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        style: "destructive",
        onPress: () => {
          router.push(ROUTES.ROOT.TABS.DASHBOARD);
          resetTrip();
        },
      },
    ]);
  };

  const handleAddCity = () => {
    router.push(ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_CITY);
  };

  const canSubmit = useMemo(() => {
    if (!tripTitle || cities.length === 0) return false;
    const parsedCities = cities.map(toCityForValidation);
    const globalStart = new Date(
      Math.min(...parsedCities.map((c) => c.startDate.getTime())),
    );
    const globalEnd = new Date(
      Math.max(...parsedCities.map((c) => c.endDate.getTime())),
    );
    const res = TripSchema.safeParse({
      title: tripTitle,
      startDate: globalStart,
      endDate: globalEnd,
      cities: parsedCities,
    });
    return res.success;
  }, [tripTitle, cities]);

  return (
    <SafeAreaView className="flex-1 mx-2 mb-3 rounded-3xl">
      <KeyboardAvoidingView
        behavior="padding"
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
              <>
                <View className="items-center mx-8 mb-6">
                  <Text className="font-JakartaExtraBold text-heading-lg mb-3 text-center">
                    Review Trip
                  </Text>
                </View>
                <TripSummaryHeader
                  title={tripTitle || "(Trip Title)"}
                  subtitle={subtitle}
                  onEdit={() => setEditOpen(true)}
                />
                <TripTitleEditModal
                  visible={editOpen}
                  initialTitle={tripTitle}
                  onSave={(newTitle) => {
                    setTripTitle(newTitle);
                    setEditOpen(false);
                  }}
                  onCancel={() => setEditOpen(false)}
                />
              </>
            )}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: 16,
              paddingTop: 8,
            }}
            renderItem={({ item }: { item: CityBlock }) => (
              <TripCityBlock
                cityId={item.cityId}
                cityName={item.cityName}
                country={item.country}
                startDate={item.startDate}
                endDate={item.endDate}
                activities={item.activities}
                restaurants={item.restaurants}
                accommodations={item.accommodations}
                onAdd={handleAddSection}
                onEdit={handleEditSection}
                onDelete={handleDelete}
                onToggleExpand={() => handleToggleExpand(item.cityId)}
                expanded={!expanded[item.cityId]}
              />
            )}
            ListEmptyComponent={() => (
              <View className="flex-1 items-center mt-8">
                <Text>No city found</Text>
              </View>
            )}
            ListFooterComponent={() => (
              <TouchableOpacity
                className="justify-center items-center mt-3 mb-5"
                onPress={handleAddCity}
              >
                <Text className="text-primary-600">+ Add Another City</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View className="flex-row justify-between px-4">
          <CustomButton
            title="Discard"
            onPress={handleDiscard}
            className="rounded-xl flex-1 mr-2"
            textVariant="primary"
            bgVariant="google"
          />
          <CustomButton
            title="Confirm"
            onPress={handleConfirm}
            disabled={!canSubmit}
            className={`rounded-xl flex-1 ml-2 ${!canSubmit ? "bg-gray-300" : "bg-blue-500"}`}
            textVariant="default"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
