// components/TripList.tsx
import React, { useMemo, useCallback } from "react";
import { FlatList } from "react-native";
import { Trip } from "@/types/type";
import TripCard from "@/components/Card/TripCard";

interface TripListProps {
  trips: Trip[];
}
const TripList: React.FC<TripListProps> = ({ trips }) => {
  const memoedTrip = useMemo(() => trips, [trips]);
  const renderItem = useCallback(
    ({ item }: { item: Trip }) => <TripCard trip={item} />,
    []
  );

  return (
    <FlatList
      data={memoedTrip}
      renderItem={renderItem}
      keyExtractor={(t) => t.id}
      className="px-4"
      initialNumToRender={3}
      maxToRenderPerBatch={5}
      windowSize={5}
    />
  );
};
export default React.memo(TripList);
