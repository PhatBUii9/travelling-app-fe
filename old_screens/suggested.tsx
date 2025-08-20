import TripList from "@/components//trip/TripList";
import { mockTrips } from "@/data/mockTrip";

const Suggested = () => {
  return <TripList title="suggested trips" filter="all" />;
};

export default Suggested;
