import React, { useMemo, useCallback } from "react";
import {
  FlatList,
  Image,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Trip, TripListProps } from "@/types/type";
import TripCard from "@/components/card/TripCard";
import { images } from "@/constant";
import useTrips from "@/hooks/useTrips";
import EmptyStateCard from "../card/EmptyStateCard";

const TripList: React.FC<TripListProps> = ({ filter, title }) => {
  const renderItem = useCallback(
    ({ item }: { item: Trip }) => <TripCard trip={item} />,
    []
  );

  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useTrips({
    filter,
  });

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center px-4 py-8">
        <EmptyStateCard
          message={`Unable to load ${title.toLowerCase()}`}
          onRetry={refetch}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View className="mt-5 items-center">
        <ActivityIndicator size="small" color="#000" />
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(t) => t.id}
      className="px-4"
      initialNumToRender={6}
      maxToRenderPerBatch={10}
      windowSize={17}
      ListEmptyComponent={() => (
        <View className="flex flex-col items-center justify-center py-8">
          <Image
            source={images.noResult}
            className="w-40 h-40"
            resizeMode="contain"
          />
          <Text className="text-sm text-secondary-600">No trips found</Text>
        </View>
      )}
    />
  );
};
export default React.memo(TripList);
