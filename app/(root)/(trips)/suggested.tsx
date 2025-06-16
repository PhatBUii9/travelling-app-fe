import TripList from "@/components/TripList";
import { mockTrips } from "@/data/mockTrip";

const Suggested = () => {
  return <TripList title="suggested trips" filter="all" />;
};

export default Suggested;
