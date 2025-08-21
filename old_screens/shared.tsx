import TripList from "@/components//trip/TripList";
import { mockTrips } from "@/data/mockTrip";

const Shared = () => {
  return <TripList title="shared trips" filter="all" />;
};

export default Shared;
