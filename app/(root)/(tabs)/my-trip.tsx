import React, { useEffect, useRef, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  ActivityIndicator,
  Alert,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import TripsDebug from "@/components/debug/TripsDebug";
import { ROUTES } from "@/constant/routes";
import { useTrips } from "@/hooks/useTrips";
import { TripWithMetadata } from "@/types/type";
import { timeAgo } from "@/utils/time";

// --- simple module-level cache so scroll survives unmount/remount ---
let lastOffsetY = 0;

export default function MyTripsScreen() {
  const {
    trips,
    isLoading,
    isRefreshing,
    error,
    refreshTrips,
    toggleFavorite,
    markViewed,
    clearError,
  } = useTrips();

  const listRef = useRef<FlatList<TripWithMetadata>>(null);

  // Show any error as an alert
  useEffect(() => {
    if (error) {
      Alert.alert("Error", error, [{ text: "OK", onPress: clearError }]);
    }
  }, [error, clearError]);

  // Restore scroll position and refresh metadata when screen focuses
  useFocusEffect(
    useCallback(() => {
      // restore without animation to avoid jump
      requestAnimationFrame(() => {
        listRef.current?.scrollToOffset({
          offset: lastOffsetY,
          animated: false,
        });
      });
      // refresh to pick up latest viewed/favorite state
      refreshTrips();

      return () => {
        // no-op on blur
      };
    }, [refreshTrips]),
  );

  const onScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    lastOffsetY = e.nativeEvent.contentOffset.y || 0;
  }, []);

  const formatDate = (iso?: string) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handlePress = async (id: string) => {
    await markViewed(id);
    router.push(`/review/${id}`);
  };

  const renderTripCard = ({ item }: { item: TripWithMetadata }) => {
    const imageSrc = item.cities[0]?.imageURL
      ? item.cities[0].imageURL
      : require("@/assets/images/empty_trips.png");

    const cityNames = item.cities.map((c: any) => c.cityName).join(", ");
    const startDate = item.startDate ? formatDate(item.startDate) : "";
    const endDate = item.endDate ? formatDate(item.endDate) : "";

    return (
      <TouchableOpacity
        onPress={() => handlePress(item.id)}
        className="flex-row items-center bg-white rounded-2xl p-4 mb-4 shadow"
      >
        <Image
          source={imageSrc}
          className="w-16 h-16 rounded-lg mr-4"
          resizeMode="cover"
        />
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-lg font-semibold text-gray-900 flex-1">
              {item.title}
            </Text>
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                toggleFavorite(item.id);
              }}
              className="ml-2 p-1"
            >
              <Icon
                name={item.isFavorite ? "heart" : "heart-o"}
                size={20}
                color={item.isFavorite ? "#EF4444" : "#9CA3AF"}
              />
            </TouchableOpacity>
          </View>

          <Text className="text-sm text-gray-500">
            {startDate && endDate
              ? `${startDate} - ${endDate}`
              : "No dates set"}
          </Text>

          <Text
            className="text-sm text-gray-500 mt-1"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.cities.length} {item.cities.length > 1 ? "cities" : "city"} ·{" "}
            {cityNames}
          </Text>

          {item.viewedAt && (
            <Text className="text-xs text-gray-400 mt-1">
              Viewed {timeAgo(item.viewedAt)}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const LoadingState = () => (
    <View className="flex-1 items-center justify-center pt-16">
      <ActivityIndicator size="large" color="#3B82F6" />
      <Text className="text-gray-500 mt-4">Loading your trips...</Text>
    </View>
  );

  const EmptyState = () => (
    <View className="flex-1 items-center justify-center pt-16">
      <Image
        source={require("@/assets/images/empty_trips.png")}
        className="w-32 h-32 mb-4"
        resizeMode="contain"
      />
      <Text className="text-lg text-gray-500 mb-2">You have no trips yet.</Text>
      <Text className="text-sm text-gray-400 mb-6 text-center px-8">
        Start planning your next adventure by creating your first trip!
      </Text>
      <TouchableOpacity
        onPress={() => router.push(ROUTES.ROOT.TRIPS.PLAN_TRIP.WIZARD_START)}
        className="bg-blue-500 px-6 py-3 rounded-full"
      >
        <Text className="text-white font-medium">Create Trip</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="px-6 pt-6 pb-4 bg-white border-b">
          <Text className="text-2xl font-bold text-center">Trip History</Text>
        </View>
        <LoadingState />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-6 pt-6 pb-4 bg-white border-b">
        <Text className="text-2xl font-bold text-center">Trip History</Text>
        {trips.length > 0 && (
          <Text className="text-sm text-gray-500 text-center mt-1">
            {trips.length} {trips.length === 1 ? "trip" : "trips"}
          </Text>
        )}
      </View>

      {/* Trip List */}
      <FlatList
        ref={listRef}
        data={trips}
        keyExtractor={(t) => t.id}
        renderItem={renderTripCard}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 120,
          flexGrow: trips.length === 0 ? 1 : undefined,
        }}
        ListEmptyComponent={EmptyState}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshTrips}
            colors={["#3B82F6"]}
            tintColor="#3B82F6"
          />
        }
        showsVerticalScrollIndicator={false}
      />

      {/* FAB */}
      <TouchableOpacity
        onPress={() => router.push(ROUTES.ROOT.TRIPS.PLAN_TRIP.WIZARD_START)}
        className="absolute bottom-8 right-8 bg-blue-500 w-14 h-14 rounded-full justify-center items-center shadow-lg"
      >
        <Text className="text-white text-2xl">＋</Text>
      </TouchableOpacity>

      {/* Debug Tools - Remove in production */}
      <TripsDebug visible={__DEV__} onDataCleared={refreshTrips} />
    </SafeAreaView>
  );
}
