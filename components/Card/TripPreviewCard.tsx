// components/UpcomingTripCard.tsx
import { ROUTES } from "@/constant/routes";
import { Trip } from "@/types/type";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import {
  useWindowDimensions,
  TouchableOpacity,
  View,
  Image,
  Text,
} from "react-native";

const TripPreviewCard = React.memo(({ trip }: { trip: Trip }) => {
  const { id, title, dates, imageUrl } = trip;
  const router = useRouter();

  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const rawWidth = SCREEN_WIDTH * 0.4;
  const MAX_CARD = 240;
  const cardWidth = Math.min(rawWidth, MAX_CARD);
  const cardHeight = cardWidth * 1.1;
  const imageHeight = cardWidth * 0.5;

  const onCardPress = useCallback(() => {
    router.push({
      pathname: ROUTES.ROOT.TRIPS.TRIP_DETAIL,
      params: { tripId: id },
    });
  }, [id]);

  return (
    <TouchableOpacity
      onPress={onCardPress}
      style={{
        width: cardWidth,
        height: cardHeight,
      }}
      className="bg-gray-50 flex-none rounded-2xl shadow-md shadow-gray-200 overflow-hidden mr-3"
      accessibilityRole="button"
      accessibilityLabel={`Upcoming trip: ${title}`}
      accessibilityHint={`View details for ${title}.`}
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
      <View className="px-4 py-2 flex-1">
        <Text
          className="font-JakartaSemiBold text-base text-primary-900"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        <Text className="mt-1 text-secondary-600 text-sm">{dates}</Text>
      </View>
    </TouchableOpacity>
  );
});

export default TripPreviewCard;
