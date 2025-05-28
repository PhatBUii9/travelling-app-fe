import { View, Text, TouchableOpacity } from "react-native";

const TripActionSheet = () => {
  return (
    <View className="p-4">
      <TouchableOpacity className="mb-4">
        <Text className="text-base text-black">Edit Trip</Text>
      </TouchableOpacity>
      <TouchableOpacity className="mb-4">
        <Text className="text-base text-black">Share</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text className="text-base text-red-500 font-bold">Delete Trip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TripActionSheet;
