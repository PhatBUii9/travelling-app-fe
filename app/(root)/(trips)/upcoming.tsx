import TripCard from "@/components/Card/TripCard";
import TripList from "@/components/TripList";
import { mockTrips } from "@/data/mockTrip";
import { Trip } from "@/types/type";
import { useCallback, useMemo } from "react";
import { FlatList } from "react-native";

const Upcoming = () => {
  const upcomingTrips = useMemo(() => {
    return mockTrips.filter((t) => t.status === "upcoming");
  }, [mockTrips]);

  return <TripList trips={upcomingTrips} />;
};

export default Upcoming;
