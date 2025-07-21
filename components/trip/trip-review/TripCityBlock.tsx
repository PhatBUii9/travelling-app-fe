import { CityBlock, TripPlannerContextType } from "@/types/type";
import { View, Text } from "react-native";

type TripCityBlock = {
  name: string;
  startDate: Date;
  endDate: Date;
};

function formatDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const TripCityBlock = ({ name, startDate, endDate }: TripCityBlock) => {
  return (
    <View className="">
      <Text className="text-heading-md font-JarkataBold">{name}</Text>
      <Text className="text-md font-JakartaSemiBold text-secondary-400 mb-2">
        {formatDate(startDate)} - {formatDate(endDate)}
      </Text>
    </View>
  );
};

export default TripCityBlock;
