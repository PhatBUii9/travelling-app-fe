// components/card/TripPreviewCard.tsx
import React, { useMemo } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { TripDraft } from "@/types/type";

type Props = {
  trip: TripDraft;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onPress?: () => void;
};

const formatRange = (start?: string, end?: string) => {
  const fmt = (iso?: string) =>
    iso
      ? new Date(iso).toLocaleDateString(undefined, {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "";
  if (!start || !end) return "No dates set";
  return `${fmt(start)} - ${fmt(end)}`;
};

const TripPreviewCard: React.FC<Props> = ({
  trip,
  isFavorite = false,
  onToggleFavorite,
  onPress,
}) => {
  const cover = useMemo(() => {
    const c0 = trip.cities?.[0];
    if (!c0?.imageURL) return require("@/assets/images/empty_trips.png");
    return typeof c0.imageURL === "number" ? c0.imageURL : { uri: c0.imageURL };
  }, [trip]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="w-64 mr-4 bg-white rounded-2xl overflow-hidden shadow"
    >
      <View className="w-full h-32">
        <Image source={cover} className="w-full h-full" resizeMode="cover" />
        {onToggleFavorite && (
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className="absolute top-2 right-2 bg-white/80 rounded-full px-2 py-1"
            accessibilityLabel={
              isFavorite ? "Unfavorite trip" : "Favorite trip"
            }
          >
            <Icon
              name={isFavorite ? "star" : "star-o"}
              size={18}
              color="#f59e0b"
            />
          </TouchableOpacity>
        )}
      </View>

      <View className="p-3">
        <Text className="text-base font-JakartaBold" numberOfLines={1}>
          {trip.title}
        </Text>
        <Text className="text-xs text-gray-500" numberOfLines={1}>
          {formatRange(trip.startDate, trip.endDate)}
        </Text>
        <Text className="text-xs text-gray-500 mt-1">
          {trip.cities?.length ?? 0}{" "}
          {trip.cities?.length === 1 ? "city" : "cities"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TripPreviewCard;
