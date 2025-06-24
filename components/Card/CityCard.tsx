import { View, Image, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

type CityCardProps = {
  city: string;
  country: string;
  imageURL: any;
  selected?: boolean;
  onPress?: () => void;
};

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
      className={`w-full flex-row items-center bg-white rounded-2xl p-4 shadow-sm mb-4 ${selected ? "border-blue-500 border" : "border-gray-200 border"}`}
    >
      <Image
        source={imageURL}
        className="h-16 w-16 rounded-lg"
        resizeMode="cover"
      />
      <View className="flex-1 ml-4">
        <Text className="text-lg font-JakartaBold text-black">{city}</Text>
        <Text className="text-base font-JakartaMedium text-secondary-700">
          {country}
        </Text>
      </View>
      {selected && <Icon name="check-circle" size={24} color="#0286FF" />}
    </TouchableOpacity>
  );
};

export default CityCard;
