import { CityCardProps } from "@/types/type";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const CityCard: React.FC<CityCardProps> = ({
  city,
  country,
  imageURL,
  selected = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full flex-row items-center rounded-2xl p-4 shadow-sm mb-4 ${selected ? "border-blue-500 border bg-blue-50" : "border-gray-200 border bg-white"}`}
      testID="city-card"
    >
      <Image
        source={imageURL}
        className="h-16 w-16 rounded-lg"
        resizeMode="cover"
        testID="city-image"
      />
      <View className="flex-1 ml-4">
        <Text className="text-lg font-JakartaBold text-black">{city}</Text>
        <Text className="text-base font-JakartaMedium text-secondary-700">
          {country}
        </Text>
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

export default CityCard;
