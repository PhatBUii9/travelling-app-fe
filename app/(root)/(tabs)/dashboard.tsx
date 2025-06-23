import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ListRenderItemInfo,
  Alert,
  Platform,
} from "react-native";
import * as Location from "expo-location";
import { useAuth } from "@/contexts/AuthContext";
import ScreenContainer from "@/components/ScreenContainer";
import GoogleTextInput from "@/components/GoogleTextInput";
import MiniMap from "@/components/MiniMap";
import TripCarousel from "@/components/TripCarousel";
import SuggestedLocation from "@/components/Card/SuggestedLocation";
import TripPreviewCard from "@/components/Card/TripPreviewCard";
import Icon from "react-native-vector-icons/FontAwesome";
import { useUserLocationStore } from "@/store/userLocationStore";
import { useRouter, RelativePathString } from "expo-router";
import { ROUTES } from "@/constant/routes";
import { SectionKey, Trip } from "@/types/type";
import { Region } from "react-native-maps";

const SECTIONS: SectionKey[] = ["header", "suggested", "upcoming", "shared"];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  const setUserLocation = useUserLocationStore((s) => s.setUserLocation);
  const setDestination = useUserLocationStore((s) => s.setDestination);
  const userLat = useUserLocationStore((s) => s.userLat);
  const userLng = useUserLocationStore((s) => s.userLng);
  const destLat = useUserLocationStore((s) => s.destLat);
  const destLng = useUserLocationStore((s) => s.destLng);

  const [hasPermissions, setHasPermissions] = useState(false);

  const defaultRegion = {
    latitude: -37.8098,
    longitude: 144.9652,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  // ask for device location once
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermissions(false);
        return;
      }
      const { coords } = await Location.getCurrentPositionAsync();
      setHasPermissions(true);
      setUserLocation(coords.latitude, coords.longitude);
    })();
  }, [setUserLocation]);

  // when user taps the “search” prompt
  const onPickLocation = useCallback(
    async (query: string) => {
      try {
        const results = await Location.geocodeAsync(query);
        if (results[0]) {
          setDestination(results[0].latitude, results[0].longitude);
        } else {
          Alert.alert("No results", "Couldn't find that address.");
        }
      } catch (e) {
        Alert.alert("Error", "Failed to look up location.");
      }
    },
    [setDestination]
  );

  const nav = useCallback(
    (path: RelativePathString) => () => router.push(path),
    [router]
  );

  let mapRegion: Region;
  if (destLat != null && destLng != null) {
    mapRegion = {
      ...defaultRegion,
      latitude: destLat,
      longitude: destLng,
    };
  } else if (hasPermissions && userLat != null && userLng != null) {
    mapRegion = {
      ...defaultRegion,
      latitude: userLat,
      longitude: userLng,
    };
  } else {
    mapRegion = defaultRegion;
  }

  const renderSection = useCallback(
    ({ item }: ListRenderItemInfo<SectionKey>) => {
      switch (item) {
        case "header":
          return (
            <>
              <View className="justify-center items-center mb-4">
                <Text className="text-3xl font-JakartaSemiBold">
                  Welcome back, {user?.username} 👋
                </Text>
              </View>
              <GoogleTextInput
                icon={<Icon name="search" size={20} color="#888" />}
                placeholder="Search location…"
                onSubmit={(query) => {
                  onPickLocation(query);
                }}
              />
              <Text className="text-xl font-JakartaBold mt-5 mb-2">
                Your Current Location
              </Text>
              <View className="h-[200px] mb-6">
                <MiniMap region={mapRegion} />
              </View>
            </>
          );
        case "suggested":
          return (
            <TripCarousel
              title="Suggested Locations"
              filter="all"
              renderItem={({ item }: { item: Trip }) => (
                <SuggestedLocation trip={item} />
              )}
              onSeeMore={nav(ROUTES.ROOT.TRIPS.SUGGESTED)}
            />
          );
        case "upcoming":
          return (
            <TripCarousel
              title="Upcoming Trips"
              filter="upcoming"
              renderItem={({ item }: { item: Trip }) => (
                <TripPreviewCard trip={item} />
              )}
              onSeeMore={nav(ROUTES.ROOT.TRIPS.UPCOMING)}
            />
          );
        case "shared":
          return (
            <TripCarousel
              title="Shared with Me"
              filter="shared"
              renderItem={({ item }: { item: Trip }) => (
                <TripPreviewCard trip={item} />
              )}
              onSeeMore={nav(ROUTES.ROOT.TRIPS.SHARED)}
            />
          );
      }
    },
    [user, mapRegion, onPickLocation, nav]
  );

  return (
    <View className="flex-1 relative">
      <ScreenContainer scrollable={false}>
        <FlatList
          data={SECTIONS}
          renderItem={renderSection}
          keyExtractor={(key) => key}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </ScreenContainer>

      <TouchableOpacity
        onPress={() => router.push(ROUTES.ROOT.TRIPS.PLAN_TRIP.WIZARD_START)}
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
