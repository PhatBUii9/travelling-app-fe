import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { getTrips, removeAllTrips } from "@/utils/tripStorage";

interface TripsDebugProps {
  visible?: boolean;
  onDataCleared?: () => void;
}

const TripsDebug: React.FC<TripsDebugProps> = ({
  visible = false,
  onDataCleared,
}) => {
  if (!visible) return null;

  const handleShowData = async () => {
    try {
      const trips = await getTrips();
      Alert.alert(
        "Current Trips Data",
        `Total trips: ${trips.length}\n\n${
          trips
            .map((trip) => `• ${trip.title} (${trip.cities.length} cities)`)
            .join("\n") || "No trips found"
        }`,
      );
    } catch (error) {
      Alert.alert("Error", "Failed to load data");
    }
  };

  const handleClearAll = async () => {
    Alert.alert("Clear All Data", "This will delete all trips. Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear All",
        style: "destructive",
        onPress: async () => {
          await removeAllTrips();
          Alert.alert("Success", "All data cleared!");
          // Refresh the screen after clearing data
          onDataCleared?.();
        },
      },
    ]);
  };

  return (
    <View className="absolute top-20 right-4 bg-black bg-opacity-80 rounded-lg p-3 z-50">
      <Text className="text-white font-bold mb-2">Debug Tools</Text>

      <TouchableOpacity
        onPress={handleShowData}
        className="bg-blue-500 px-3 py-1 rounded mb-2"
      >
        <Text className="text-white text-xs">Show Data</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleClearAll}
        className="bg-red-500 px-3 py-1 rounded"
      >
        <Text className="text-white text-xs">Clear All</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TripsDebug;
