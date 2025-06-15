// components/TripCarousel.tsx
import React, { useMemo, useState } from "react";
import { View, FlatList, ListRenderItemInfo } from "react-native";
import SectionHeader from "@/components/SectionHeader";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import EmptyStateCard from "@/components/EmptyStateCard";
import useTrips from "@/hooks/useTrips";
import { TripCarouselProps } from "@/types/type";

const TripCarousel: React.FC<TripCarouselProps> = React.memo(
  ({
    title,
    filter,
    simulateError = false,
    renderItem,
    onSeeMore,
    visibleCount = 4,
  }) => {
    const {
      data = [],
      isLoading,
      isError,
      refetch,
    } = useTrips({
      filter,
      simulateError,
    });

    const canSeeMore = !isLoading && !isError;

    return (
      <View className="mb-6">
        <SectionHeader
          title={title}
          onPress={canSeeMore ? onSeeMore : undefined}
          canSeeMore={canSeeMore}
        />

        {isError ? (
          <FlatList
            horizontal
            data={[{}]}
            keyExtractor={(_, i) => `error-${filter}-${i}`}
            renderItem={() => (
              <EmptyStateCard
                message={`Unable to load ${title.toLowerCase()}`}
                onRetry={refetch}
              />
            )}
            showsHorizontalScrollIndicator={false}
            className="px-4"
          />
        ) : isLoading ? (
          <FlatList
            horizontal
            data={Array(visibleCount).fill(null)}
            keyExtractor={(_, i) => `skel-${filter}-${i}`}
            renderItem={() => <LoadingSkeleton />}
            showsHorizontalScrollIndicator={false}
            className="px-4"
          />
        ) : (
          <FlatList
            horizontal
            data={data.slice(0, visibleCount)}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            className="px-4"
          />
        )}
      </View>
    );
  }
);

export default TripCarousel;
