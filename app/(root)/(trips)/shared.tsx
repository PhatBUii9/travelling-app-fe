import TripCard from "@/components/card/TripCard";
import TripList from "@/components/trip/TripList";
import { mockTrips } from "@/data/mockTrip";
import { Trip } from "@/types/type";
import { useCallback, useMemo } from "react";
import { FlatList } from "react-native";

const Shared = () => {
  return <TripList title="shared trips" filter="shared" />;
};

export default Shared;
