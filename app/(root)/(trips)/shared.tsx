import TripCard from "@/components/Card/TripCard";
import TripList from "@/components/TripList";
import { mockTrips } from "@/data/mockTrip";
import { Trip } from "@/types/type";
import { useCallback, useMemo } from "react";
import { FlatList } from "react-native";

const Shared = () => {
  const sharedTrips = useMemo(() => {
    return mockTrips.filter((t) => t.shared);
  }, [mockTrips]);

  return <TripList trips={sharedTrips} />;
};

export default Shared;
