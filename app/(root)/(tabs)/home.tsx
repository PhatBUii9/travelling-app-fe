import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TripCard from "@/components/TripCard";
import { mockTrips } from "@/data/mockTrip";

const Dashboard = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={mockTrips}
        renderItem={({ item }) => <TripCard trip={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

export default Dashboard;
