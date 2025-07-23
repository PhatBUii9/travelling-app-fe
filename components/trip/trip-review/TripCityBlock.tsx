import { mockActivities } from "@/data/mockActivities";
import {
  View,
  Text,
  TouchableOpacity,
  ListRenderItem,
  Image,
} from "react-native";
import { FlatList } from "react-native-actions-sheet";

type TripCityBlockProps = {
  cityName: string;
  country: string;
  startDate: Date;
  endDate: Date;
  activities: string[];
  restaurants?: string[];
  accommodations?: string[];
};

type TripSectionProps<T> = {
  sectionTitle: string;
  data: T[];
  renderItem: ListRenderItem<T>;
  onEdit: () => void;
  onAdd: () => void;
  isListEmpty: boolean;
};

function formatDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const TripSection = <T,>({
  sectionTitle,
  data,
  renderItem,
  onEdit,
  onAdd,
  isListEmpty = true,
}: TripSectionProps<T>) => {
  return (
    <View>
      <View>
        <FlatList
          data={data}
          keyExtractor={(item) => (item as any).id}
          ItemSeparatorComponent={() => <View className="h-3" />}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View className="flex-row justify-between mb-2">
              <Text className="text-lg font-JakartaSemiBold">
                {sectionTitle}
              </Text>
              {isListEmpty ? (
                <TouchableOpacity onPress={onAdd}>
                  <Text className="text-primary-600 text-lg">Add</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={onEdit}>
                  <Text className="text-primary-600 text-lg">Edit</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

const TripCityBlock = ({
  cityName,
  startDate,
  endDate,
  country,
  activities,
  restaurants,
  accommodations,
}: TripCityBlockProps) => {
  const handleEdit = () => {};

  const handleAdd = () => {};

  const fullActivities = activities
    .map((id) => mockActivities.find((a) => a.id === id))
    .filter(Boolean);

  return (
    <View className="">
      <Text className="text-heading-md font-JakartaBold">{cityName}</Text>
      <Text className="text-md font-JakartaSemiBold text-secondary-500 mb-5">
        {formatDate(startDate)} - {formatDate(endDate)}
      </Text>
      <TripSection
        sectionTitle="Activities"
        data={fullActivities}
        renderItem={({ item }: { item: any }) => (
          <View className="flex-row items-center mb-2 ml-2">
            <Image source={item.image} className="w-14 h-14 rounded-md mr-3" />
            <View className="flex-1">
              <Text
                className="font-JakartaSemiBold text-md"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.name}
              </Text>
              <Text className="text-sm text-secondary-600">
                {item.category}
              </Text>
            </View>
          </View>
        )}
        onEdit={handleEdit}
        onAdd={handleAdd}
        isListEmpty={activities.length === 0}
      />
    </View>
  );
};

export default TripCityBlock;
