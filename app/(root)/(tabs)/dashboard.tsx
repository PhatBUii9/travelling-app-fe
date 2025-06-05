// screens/Dashboard.tsx

import React from "react";
import { FlatList, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
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

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { control } = useForm<IFormInputs>();

  const melbourneRegion = {
    latitude: -37.809811,
    longitude: 144.965195,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  // Pre‐filtered arrays for “upcoming” and “shared” trips
  const upcomingTrips = mockTrips.filter((t) => t.status === "upcoming");
  const sharedTrips = mockTrips.filter((t) => t.shared);

  return (
    <ScreenContainer>
      {/* ---------- Welcome + Search ---------- */}
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

      {/* ---------- Suggested Locations (horizontal) ---------- */}
      <SectionHeader title="Suggested Locations" />

      <View className="mb-6">
        <FlatList
          data={mockTrips}
          renderItem={({ item }) => <SuggestedLocation trip={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          // we use px-4 to replace inline paddingLeft/paddingRight
          className="px-4"
          initialNumToRender={3}
          maxToRenderPerBatch={5}
          windowSize={5}
        />
      </View>

      {/* ---------- Upcoming Trips (horizontal) ---------- */}
      <SectionHeader title="Upcoming Trips" />

      <View className="mb-6">
        <FlatList
          data={upcomingTrips}
          renderItem={({ item }) => <TripPreviewCard trip={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4"
          initialNumToRender={3}
          maxToRenderPerBatch={5}
          windowSize={5}
        />
      </View>

      {/* ---------- Shared with Me (horizontal) ---------- */}
      <SectionHeader title="Shared with Me" />

      <View className="mb-6">
        <FlatList
          data={sharedTrips}
          renderItem={({ item }) => <TripPreviewCard trip={item} />}
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
  );
};

export default Dashboard;
