// components/UpcomingTripCard.tsx
import { ROUTES } from "@/constant/routes";
import { Trip } from "@/types/type";
import { useRouter } from "expo-router";
import { TouchableOpacity, View, Image, Text } from "react-native";

const UpcomingTripCard = ({ trip }: { trip: Trip }) => {
  const { id, title, dates, imageUrl } = trip;
  const router = useRouter();

  const onCardPress = () => {
    router.push({
      pathname: ROUTES.ROOT.TRIP_DETAIL,
      params: { tripId: id },
    });
  };

  return (
    <TouchableOpacity
      onPress={onCardPress}
      className="
        bg-white flex-none
        rounded-2xl
        shadow-md shadow-gray-200
        overflow-hidden
        w-48             
        h-48             
      "
      style={{ marginRight: 12 }} // horizontal spacing between cards
    >
      {/* Image at top: always 96px tall, covers full width */}
      <Image
        source={typeof imageUrl === "string" ? { uri: imageUrl } : imageUrl}
        className="w-full h-24 bg-gray-200"
        resizeMode="cover"
        //defaultSource={require("@/assets/placeholder.png")}
      />

      {/* Bottom half (flexes to fill remaining 96px) */}
      <View className="flex-1 px-4 py-2 justify-between">
        <Text
          className="font-JakartaSemiBold text-base text-primary-900"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        <Text className="text-secondary-400 text-sm">{dates}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default UpcomingTripCard;
