import { PlaceCardProps } from "@/types/type";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const PlaceCard: React.FC<PlaceCardProps> = ({
  id,
  name,
  category,
  imageURL,
  selected = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full flex-row items-start rounded-2xl p-4 shadow-sm mb-4 ${selected ? "border-blue-500 border bg-blue-50" : "border-gray-200 border bg-white"}`}
      testID={`place-card-${id}`}
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
        <View className="flex-row items-center">
          <Icon name="tag" size={18} color="#0286FF" testID="category-icon" />
          <Text className="text-base font-JakartaMedium text-secondary-700 ml-2 ">
            {category}
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

export default PlaceCard;
