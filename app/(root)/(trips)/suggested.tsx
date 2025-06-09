import TripList from "@/components/TripList";
import { mockTrips } from "@/data/mockTrip";

const Suggested = () => {
  return <TripList trips={mockTrips} />;
};

export default Suggested;
