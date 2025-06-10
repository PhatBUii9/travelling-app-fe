// components/TripCarousel.tsx
import React, { ReactNode, useMemo } from "react";
import { View, FlatList, ListRenderItemInfo } from "react-native";
import SectionHeader from "@/components/SectionHeader";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorFallback from "@/components/ErrorFallBack";
import useTrips from "@/hooks/useTrips";
import { TripCarouselProps } from "@/types/type";

const TripCarousel: React.FC<TripCarouselProps> = React.memo(
  ({ title, filter, renderItem, onSeeMore, visibleCount = 4 }) => {
    const { data, isLoading, isError, refetch } = useTrips({ filter });

    const skeletonItems = useMemo(
      () => Array(visibleCount).fill(null),
      [visibleCount]
    );

    const flatListProps = {
      horizontal: true,
      showsHorizontalScrollIndicator: false,
      className: "px-4",
      initialNumToRender: visibleCount,
      maxToRenderPerBatch: visibleCount,
      windowSize: visibleCount,
      data: isLoading ? skeletonItems : data.slice(0, visibleCount),
      keyExtractor: (_: any, i: number) =>
        isLoading ? `skel-${filter}-${i}` : data[i].id,
      renderItem: isLoading ? () => <LoadingSkeleton /> : (renderItem as any),
    };

    return (
      <View className="mb-6">
        <SectionHeader title={title} onPress={onSeeMore} />

        {isError ? (
          <ErrorFallback onPress={refetch} />
        ) : (
          <FlatList {...flatListProps} />
        )}
      </View>
    );
  }
);

export default TripCarousel;
