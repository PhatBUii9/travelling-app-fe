import { Trip } from "@/types/type";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { icons } from "@/constant";
import { useRouter } from "expo-router";
import { ROUTES } from "@/constant/routes";

const TripCard = ({ trip }: { trip: Trip }) => {
  const router = useRouter();

  const { id, title, destination, dates, status, imageUrl } = trip;

  const onPress = () => {
    console.log("Trip card pressed!");
    router.push({
      pathname: ROUTES.ROOT.TRIP_DETAIL,
      params: {
        tripId: id,
      },
    });
  };

  let statusColor = "";
  switch (status) {
    case "upcoming":
      statusColor = "text-green-500";
      break;
    case "completed":
      statusColor = "text-gray-500";
      break;
    case "cancelled":
      statusColor = "text-red-500";
      break;
    default:
      statusColor = "text-black";
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-2xl shadow-md shadow-gray-200 p-5 my-4 mx-5"
    >
      <View className="flex-row">
        <Image
          source={typeof imageUrl === "string" ? { uri: imageUrl } : imageUrl}
          className="w-24 h-24 rounded-lg"
          resizeMode="cover"
        />
        <View className="flex-1 flex-col mx-4">
          <Text className="font-bold text-xl text-gray-900">{title}</Text>
          <View className="flex-row items-center mt-1">
            <Image
              source={icons.point}
              className="w-4 h-4 mr-1"
              resizeMode="contain"
            />
            <Text className="text-gray-500 text-sm">{destination}</Text>
          </View>
          <Text className="text-gray-700 text-sm mt-1">{dates}</Text>
        </View>
      </View>
      <View className="items-end mt-2">
        <Text className={`text-xs font-bold ${statusColor}`}>
          {status.toUpperCase()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TripCard;
