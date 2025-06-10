// screens/Dashboard.tsx
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import useTrips from "@/hooks/useTrips";
import ScreenContainer from "@/components/ScreenContainer";
import InputField from "@/components/InputField";
import SectionHeader from "@/components/SectionHeader";
import SuggestedLocation from "@/components/Card/SuggestedLocation";
import MiniMap from "@/components/MiniMap";
import TripPreviewCard from "@/components/Card/TripPreviewCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorFallback from "@/components/ErrorFallBack";
import Icon from "react-native-vector-icons/FontAwesome";
import { IFormInputs } from "@/types/type";
import { useForm } from "react-hook-form";
import { router } from "expo-router";
import { ROUTES } from "@/constant/routes";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { control } = useForm<IFormInputs>();
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: suggestedData,
    isLoading: sugLoading,
    isError: sugError,
    refetch: sugRefetch,
  } = useTrips({ filter: "all" });

  const {
    data: upcomingData,
    isLoading: upLoading,
    isError: upError,
    refetch: upRefetch,
  } = useTrips({ filter: "upcoming", simulateError: true });

  const {
    data: sharedData,
    isLoading: shLoading,
    isError: shError,
    refetch: shRefetch,
  } = useTrips({ filter: "shared" });

  // Handlers for "See more" buttons
  const onSuggestedPress = useCallback(
    () => router.push(ROUTES.ROOT.TRIPS.SUGGESTED),
    []
  );
  const onUpcomingPress = useCallback(
    () => router.push(ROUTES.ROOT.TRIPS.UPCOMING),
    []
  );
  const onSharedPress = useCallback(
    () => router.push(ROUTES.ROOT.TRIPS.SHARED),
    []
  );

  // Region for MiniMap
  const melbourneRegion = {
    latitude: -37.809811,
    longitude: 144.965195,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const VISIBLE_COUNT = 4;

  // Skeleton placeholder array
  const skeletonItems = Array.from({ length: VISIBLE_COUNT });

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, []);

  return (
    <View className="flex-1 relative">
      <ScreenContainer>
        {/* Welcome + Search */}
        <View className="justify-center items-center mb-4">
          <Text className="text-3xl font-JakartaSemiBold">
            Welcome back, {user?.username} 👋
          </Text>
        </View>

        <InputField
          name="location"
          placeholder="Places to go…"
          control={control}
          label=""
          className="mb-4"
          icon={require("@/assets/icons/search.png")}
          containerStyle="bg-gray-200"
        />

        <MiniMap region={melbourneRegion} />

        {/* Suggested Locations */}
        <SectionHeader title="Suggested Locations" onPress={onSuggestedPress} />
        <View className="mb-6">
          {sugError ? (
            <ErrorFallback onPress={sugRefetch} />
          ) : sugLoading ? (
            <FlatList
              data={skeletonItems}
              horizontal
              showsHorizontalScrollIndicator={false}
              className="px-4"
              keyExtractor={(_, i) => `skel-suggested-${i}`}
              renderItem={() => <LoadingSkeleton />}
            />
          ) : (
            <FlatList
              data={suggestedData.slice(0, VISIBLE_COUNT)}
              horizontal
              showsHorizontalScrollIndicator={false}
              className="px-4"
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <SuggestedLocation trip={item} />}
            />
          )}
        </View>

        {/* Upcoming Trips */}
        <SectionHeader title="Upcoming Trips" onPress={onUpcomingPress} />
        <View className="mb-6">
          {upError ? (
            <ErrorFallback onPress={upRefetch} />
          ) : upLoading ? (
            <FlatList
              data={skeletonItems}
              horizontal
              showsHorizontalScrollIndicator={false}
              className="px-4"
              keyExtractor={(_, i) => `skel-upcoming-${i}`}
              renderItem={() => <LoadingSkeleton />}
            />
          ) : (
            <FlatList
              data={upcomingData.slice(0, VISIBLE_COUNT)}
              horizontal
              showsHorizontalScrollIndicator={false}
              className="px-4"
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TripPreviewCard trip={item} />}
            />
          )}
        </View>

        {/* Shared with Me */}
        <SectionHeader title="Shared with Me" onPress={onSharedPress} />
        <View className="mb-6">
          {shError ? (
            <ErrorFallback onPress={shRefetch} />
          ) : shLoading ? (
            <FlatList
              data={skeletonItems}
              horizontal
              showsHorizontalScrollIndicator={false}
              className="px-4"
              keyExtractor={(_, i) => `skel-shared-${i}`}
              renderItem={() => <LoadingSkeleton />}
            />
          ) : (
            <FlatList
              data={sharedData.slice(0, VISIBLE_COUNT)}
              horizontal
              showsHorizontalScrollIndicator={false}
              className="px-4"
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TripPreviewCard trip={item} />}
            />
          )}
        </View>
      </ScreenContainer>

      {/* Floating “Plan a Trip” FAB */}
      <TouchableOpacity
        onPress={() => console.log("Plan a Trip pressed")}
        className="bg-primary-400 rounded-full w-16 h-16 justify-center items-center absolute bottom-6 right-6 shadow-lg shadow-gray-200"
        accessibilityRole="button"
        accessibilityLabel="Create a trip plan"
        accessibilityHint="Opens the trip creation screen"
      >
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;
