// components/SuggestedLocation.tsx

import { Trip } from "@/types/type";
import { TouchableOpacity, View, Image, Text } from "react-native";

const SuggestedLocation = ({ trip }: { trip: Trip }) => {
  const onSLPress = () => {
    console.log("Suggested location pressed.");
  };

  const { title, destination, imageUrl } = trip;

  return (
    <TouchableOpacity
      onPress={onSLPress}
      className="
        bg-white
        flex-none
        rounded-2xl
        shadow-md shadow-gray-200
        overflow-hidden
        w-48    /* 192px */
        h-48    /* 192px */
      "
      style={{
        marginRight: 12, // horizontal spacing between cards
      }}
    >
      {/* Top half: fixed 96px for the image */}
      <Image
        source={typeof imageUrl === "string" ? { uri: imageUrl } : imageUrl}
        className="w-full h-24 bg-gray-200"
        resizeMode="cover"
        //defaultSource={require("@/assets/placeholder.png")}
      />

      {/* Bottom half (flexes to fill ~96px) */}
      <View className="flex-1 px-4 py-2 justify-between">
        <Text
          className="font-JakartaSemiBold text-base text-primary-900"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        <Text className="text-secondary-500 text-sm">{destination}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SuggestedLocation;
