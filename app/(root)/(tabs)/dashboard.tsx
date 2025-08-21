// app/(root)/(tabs)/dashboard.tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";

import { useAuth } from "@/contexts/AuthContext";
import ScreenContainer from "@/components/common/ScreenContainer";
import GoogleTextInput from "@/components/common/GoogleTextInput";
import MiniMap from "@/components/trip/MiniMap";
import TripPreviewCard from "@/components/card/TripPreviewCard";

import { useUserLocationStore } from "@/store/userLocationStore";
import { ROUTES } from "@/constant/routes";
import { TripDraft } from "@/types/type";
import { tripsService } from "@/services/tripsService";

// --- Small internal components ---
const SectionHeader = ({
  title,
  onSeeAll,
}: {
  title: string;
  onSeeAll?: () => void;
}) => (
  <View className="flex-row items-center justify-between mb-2 mt-6 px-1">
    <Text className="text-xl font-JakartaBold">{title}</Text>
    {onSeeAll && (
      <TouchableOpacity onPress={onSeeAll}>
        <Text className="text-primary-600">See all</Text>
      </TouchableOpacity>
    )}
  </View>
);

const SkeletonRow = () => (
  <View className="flex-row">
    {[0, 1, 2].map((k) => (
      <View key={k} className="w-64 h-44 mr-4 bg-gray-100 rounded-2xl" />
    ))}
  </View>
);

const EmptyRow = ({ message }: { message: string }) => (
  <View className="px-1 py-6">
    <Text className="text-gray-500">{message}</Text>
  </View>
);

const Dashboard: React.FC = () => {
  // ---------- Auth / router ----------
  const { user } = useAuth();
  const router = useRouter();

  // ---------- Location store ----------
  const setUserLocation = useUserLocationStore((s) => s.setUserLocation);
  const setDestination = useUserLocationStore((s) => s.setDestination);
  const userLat = useUserLocationStore((s) => s.userLat);
  const userLng = useUserLocationStore((s) => s.userLng);
  const destLat = useUserLocationStore((s) => s.destLat);
  const destLng = useUserLocationStore((s) => s.destLng);

  // ---------- Local UI state ----------
  const [hasPermissions, setHasPermissions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<TripDraft[]>([]);
  const [recent, setRecent] = useState<TripDraft[]>([]);
  const [favIds, setFavIds] = useState<Record<string, boolean>>({});

  // ---------- Map region ----------
  const defaultRegion = useMemo(
    () => ({
      latitude: -37.8098,
      longitude: 144.9652,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }),
    [],
  );

  const mapRegion = useMemo(() => {
    if (destLat != null && destLng != null) {
      return { ...defaultRegion, latitude: destLat, longitude: destLng };
    }
    if (hasPermissions && userLat != null && userLng != null) {
      return { ...defaultRegion, latitude: userLat, longitude: userLng };
    }
    return defaultRegion;
  }, [defaultRegion, destLat, destLng, hasPermissions, userLat, userLng]);

  // ---------- Ask for device location once ----------
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setHasPermissions(false);
          return;
        }
        const { coords } = await Location.getCurrentPositionAsync();
        setHasPermissions(true);
        setUserLocation(coords.latitude, coords.longitude);
      } catch {
        setHasPermissions(false);
      }
    })();
  }, [setUserLocation]);

  // ---------- Search handler ----------
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
    [setDestination],
  );

  // ---------- Navigation helpers ----------
  const goTrip = (id: string) =>
    router.push({
      pathname: ROUTES.ROOT.TRIPS.REVIEW.DETAIL,
      params: { id },
    });

  // ---------- Load dashboard data via service ----------
  const load = useCallback(async () => {
    setLoading(true);

    const [favTrips, recentTrips] = await Promise.all([
      tripsService.favorites(5),
      tripsService.recentlyViewed(5),
    ]);

    // build fav map for instant UI
    const map: Record<string, boolean> = {};
    await Promise.all(
      favTrips.map(async (t) => {
        map[t.id] = await tripsService.isFavorite(t.id);
      }),
    );

    setFavorites(favTrips);
    setRecent(recentTrips);
    setFavIds(map);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // ---------- Optimistic favorite toggle via service ----------
  const onToggleFavorite = useCallback(async (trip: TripDraft) => {
    // optimistic
    setFavIds((prev) => ({ ...prev, [trip.id]: !prev[trip.id] }));
    try {
      await tripsService.toggleFavorite(trip.id);
      const nextFavs = await tripsService.favorites(5);
      setFavorites(nextFavs);
      setFavIds((prev) => ({
        ...prev,
        [trip.id]: !!nextFavs.find((t) => t.id === trip.id),
      }));
    } catch {
      // revert
      setFavIds((prev) => ({ ...prev, [trip.id]: !prev[trip.id] }));
    }
  }, []);

  return (
    <View className="flex-1 relative">
      <ScreenContainer scrollable>
        {/* ====== KEEP: Header / Search / Map ====== */}
        <View className="justify-center items-center mb-4">
          <Text className="text-3xl font-JakartaSemiBold">
            Welcome back, {user?.username ?? "traveler"} 👋
          </Text>
        </View>

        <GoogleTextInput
          icon={<Icon name="search" size={20} color="#888" />}
          placeholder="Search location…"
          onSubmit={onPickLocation}
        />

        <Text className="text-xl font-JakartaBold mt-5 mb-2">
          Your Current Location
        </Text>

        <View className="h-[200px] mb-6">
          <MiniMap region={mapRegion} />
        </View>

        {/* ====== Favorites ====== */}
        <SectionHeader title="Favorites" />
        {loading ? (
          <SkeletonRow />
        ) : favorites.length === 0 ? (
          <EmptyRow message="No favorites yet — star a trip to see it here." />
        ) : (
          <FlatList
            horizontal
            data={favorites}
            keyExtractor={(t) => t.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 4 }}
            renderItem={({ item }) => (
              <TripPreviewCard
                trip={item}
                isFavorite={!!favIds[item.id]}
                onToggleFavorite={() => onToggleFavorite(item)}
                onPress={() => goTrip(item.id)}
              />
            )}
          />
        )}

        {/* ====== Recently Viewed ====== */}
        <SectionHeader title="Recently Viewed" />
        {loading ? (
          <SkeletonRow />
        ) : recent.length === 0 ? (
          <EmptyRow message="Your recently viewed trips will appear here." />
        ) : (
          <FlatList
            horizontal
            data={recent}
            keyExtractor={(t) => t.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 4 }}
            renderItem={({ item }) => (
              <TripPreviewCard
                trip={item}
                isFavorite={!!favIds[item.id]}
                onToggleFavorite={() => onToggleFavorite(item)}
                onPress={() => goTrip(item.id)}
              />
            )}
          />
        )}
      </ScreenContainer>

      {/* FAB: Create Trip */}
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
