// screens/Dashboard.tsx
import React, { useCallback, useMemo } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import ScreenContainer from "@/components/ScreenContainer";
import { mockTrips } from "@/data/mockTrip";
import InputField from "@/components/InputField";
import { IFormInputs } from "@/types/type";
import { useForm } from "react-hook-form";
import { icons } from "@/constant";
import SectionHeader from "@/components/SectionHeader";
import SuggestedLocation from "@/components/Card/SuggestedLocation";
import MiniMap from "@/components/MiniMap";
import TripPreviewCard from "@/components/Card/TripPreviewCard";
import Icon from "react-native-vector-icons/FontAwesome";
import { Trip } from "@/types/type";
import { router } from "expo-router";
import { ROUTES } from "@/constant/routes";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { control } = useForm<IFormInputs>();

  const melbourneRegion = {
    latitude: -37.809811,
    longitude: 144.965195,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const upcomingTrips = useMemo(() => {
    return mockTrips.filter((t) => t.status === "upcoming");
  }, [mockTrips]);

  const sharedTrips = useMemo(() => {
    return mockTrips.filter((t) => t.shared);
  }, [mockTrips]);

  const renderSuggested = useCallback(
    ({ item }: { item: Trip }) => <SuggestedLocation trip={item} />,
    []
  );

  const renderTripPreview = useCallback(
    ({ item }: { item: Trip }) => <TripPreviewCard trip={item} />,
    []
  );

  const onUpcomingPress = useCallback(() => {
    router.push(ROUTES.ROOT.TRIPS.UPCOMING);
  }, []);

  const onSharedPress = useCallback(() => {
    router.push(ROUTES.ROOT.TRIPS.SHARED);
  }, []);

  const onSuggestedPress = useCallback(() => {
    router.push(ROUTES.ROOT.TRIPS.SUGGESTED);
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
          icon={icons.search}
          containerStyle="bg-gray-200"
        />

        <MiniMap region={melbourneRegion} />

        {/* Suggested Locations */}
        <SectionHeader title="Suggested Locations" onPress={onSuggestedPress} />
        <View className="mb-6">
          <FlatList
            data={mockTrips.slice(0, 4)}
            renderItem={renderSuggested}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-4"
            initialNumToRender={3}
            maxToRenderPerBatch={5}
            windowSize={5}
          />
        </View>

        {/* Upcoming Trips */}
        <SectionHeader title="Upcoming Trips" onPress={onUpcomingPress} />
        <View className="mb-6">
          <FlatList
            data={upcomingTrips.slice(0, 4)}
            renderItem={renderTripPreview}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-4"
            initialNumToRender={3}
            maxToRenderPerBatch={5}
            windowSize={5}
          />
        </View>

        {/* Shared with Me */}
        <SectionHeader title="Shared with Me" onPress={onSharedPress} />
        <View className="mb-6">
          <FlatList
            data={sharedTrips.slice(0, 4)}
            renderItem={renderTripPreview}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-4"
            initialNumToRender={3}
            maxToRenderPerBatch={5}
            windowSize={5}
          />
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
        <Icon name="plus-square" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;
