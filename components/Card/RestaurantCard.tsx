import { ResataurantCardProps } from "@/types/type";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const RestaurantCard: React.FC<ResataurantCardProps> = ({
  id,
  name,
  cuisine,
  rating,
  imageURL,
  selected = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full flex-row items-start rounded-2xl p-4 shadow-sm mb-4 ${selected ? "border-blue-500 border bg-blue-50" : "border-gray-200 border bg-white"}`}
      activeOpacity={0.8}
      testID={`place-card-${id}`}
      accessibilityRole="button"
      accessibilityLabel={`Select ${name} restaurant`}
    >
      <Image
        source={imageURL}
        className="h-16 w-16 rounded-lg"
        resizeMode="cover"
        testID="city-image"
      />
      <View className="flex-1 ml-4">
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          className="text-lg font-JakartaBold text-black"
        >
          {name}
        </Text>
        <View className="flex-row items-center justify-between w-full">
          <View className="flex-row items-center">
            <Text className="text-sm font-JakartaMedium text-secondary-700 mr-1">
              {rating}
            </Text>
            <Icon name="star" size={14} color="#22C55E" testID="rating-icon" />
          </View>
          <Text className="text-sm font-JakartaSemiBold text-secondary-700 mr-1">
            {cuisine}
          </Text>
        </View>
      </View>
      {selected && (
        <Icon
          name="check-circle"
          size={24}
          color="#0286FF"
          testID="check-icon"
        />
      )}
    </TouchableOpacity>
  );
};

export default RestaurantCard;
