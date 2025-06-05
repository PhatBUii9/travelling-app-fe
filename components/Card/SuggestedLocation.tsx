// components/SuggestedLocation.tsx
import { ROUTES } from "@/constant/routes";
import { Trip } from "@/types/type";
import { useRouter } from "expo-router";
import {
  Dimensions,
  useWindowDimensions,
  TouchableOpacity,
  View,
  Image,
  Text,
} from "react-native";

const SuggestedLocation = ({ trip }: { trip: Trip }) => {
  const { title, destination, imageUrl } = trip;
  const router = useRouter();

  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const rawWidth = SCREEN_WIDTH * 0.4;
  const MAX_CARD = 240;
  const cardWidth = Math.min(rawWidth, MAX_CARD);
  const cardHeight = cardWidth * 1.1;
  const imageHeight = cardWidth * 0.5;

  const onSLPress = () => {
    console.log("Suggested location pressed.");
  };

  return (
    <TouchableOpacity
      onPress={onSLPress}
      style={{
        width: cardWidth,
        height: cardHeight,
      }}
      className="bg-gray-50 flex-none rounded-2xl shadow-md shadow-gray-200 overflow-hidden mr-3"
    >
      {/* The image container: */}
      <Image
        source={typeof imageUrl === "string" ? { uri: imageUrl } : imageUrl}
        style={{
          width: cardWidth,
          height: imageHeight,
        }}
        resizeMode="cover"
      />

      {/* Text area below the image */}
      <View className="px-4 py-2">
        <Text
          className="font-JakartaSemiBold text-base text-primary-900"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        <Text className="mt-1 text-secondary-600 text-sm">{destination}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SuggestedLocation;
