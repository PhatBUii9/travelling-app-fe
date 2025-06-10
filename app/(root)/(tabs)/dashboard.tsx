// screens/Dashboard.tsx
import React, { useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import ScreenContainer from "@/components/ScreenContainer";
import InputField from "@/components/InputField";
import MiniMap from "@/components/MiniMap";
import TripCarousel from "@/components/TripCarousel";
import SuggestedLocation from "@/components/Card/SuggestedLocation";
import TripPreviewCard from "@/components/Card/TripPreviewCard";
import Icon from "react-native-vector-icons/FontAwesome";
import { useForm } from "react-hook-form";
import { IFormInputs, Trip } from "@/types/type";
import { RelativePathString, router } from "expo-router";
import { ROUTES } from "@/constant/routes";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { control } = useForm<IFormInputs>();

  const melbourneRegion = {
    latitude: -37.8098,
    longitude: 144.9652,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const nav = useCallback(
    (path: RelativePathString) => () => router.push(path),
    []
  );

  return (
    <View className="flex-1 relative">
      <ScreenContainer>
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

        <TripCarousel
          title="Suggested Locations"
          filter="all"
          renderItem={({ item }: { item: Trip }) => (
            <SuggestedLocation trip={item} />
          )}
          onSeeMore={nav(ROUTES.ROOT.TRIPS.SUGGESTED)}
          simulateError={true}
        />

        <TripCarousel
          title="Upcoming Trips"
          filter="upcoming"
          renderItem={({ item }: { item: Trip }) => (
            <TripPreviewCard trip={item} />
          )}
          onSeeMore={nav(ROUTES.ROOT.TRIPS.UPCOMING)}
        />

        <TripCarousel
          title="Shared with Me"
          filter="shared"
          renderItem={({ item }: { item: Trip }) => (
            <TripPreviewCard trip={item} />
          )}
          onSeeMore={nav(ROUTES.ROOT.TRIPS.SHARED)}
        />
      </ScreenContainer>

      <TouchableOpacity
        onPress={() => console.log("Create a trip plan pressed.")}
        className="bg-primary-500 rounded-full w-16 h-16 justify-center items-center absolute bottom-6 right-6 shadow-lg shadow-gray-200"
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
