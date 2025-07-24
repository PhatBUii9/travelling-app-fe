import { mockActivities } from "@/data/mockActivities";
import { mockRestaurants } from "@/data/mockRestaurants";
import {
  View,
  Text,
  TouchableOpacity,
  ListRenderItem,
  Image,
  Alert,
} from "react-native";
import { FlatList } from "react-native-actions-sheet";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/FontAwesome";
import { mockAccommodations } from "@/data/mockAccommodations";

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
          ItemSeparatorComponent={() => <View className="h-2" />}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View className="flex-row justify-between mb-1">
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
          ListFooterComponent={() => <View className="mb-3" />}
        />
      </View>
    </View>
  );
};

const Divider = () => {
  return <View className="h-1 w-full bg-gray-200 rounded-full my-2" />;
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

  const handleDelete = () => {
    Alert.alert("Remove City", "Do you want to remove this city?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        style: "destructive",
        onPress: () => {
          console.log("Ok Pressed");
        },
      },
    ]);
  };

  const fullActivities = activities
    .map((id) => mockActivities.find((a) => a.id === id))
    .filter(Boolean);

  const fullRestaurants = restaurants!
    .map((id) => mockRestaurants.find((a) => a.id === id))
    .filter(Boolean);

  const fullAccommodations = accommodations!
    .map((id) => mockAccommodations.find((a) => a.id === id))
    .filter(Boolean);

  return (
    <View className="bg-white px-4 pb-4 pt-2 rounded-3xl">
      <View className="flex-row items-center justify-between mb-1">
        <Text className="text-heading-md font-JakartaBold">{cityName}</Text>
        <TouchableOpacity
          onPress={handleDelete}
          accessibilityLabel="Remove city"
        >
          <Icon name="trash" size={24} color="#FF0000" />
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-base font-JakartaSemiBold text-secondary-500">
          {country}
        </Text>
        <Text className="text-md font-JakartaSemiBold text-secondary-600">
          {formatDate(startDate)} - {formatDate(endDate)}
        </Text>
      </View>

      {/* Activity section */}
      <TripSection
        sectionTitle="Activities"
        data={fullActivities}
        renderItem={({ item }: { item: any }) => (
          <View className="flex-row items-center p-2 bg-gray-50 rounded-xl">
            {!!item.image ? (
              <Image
                source={item.image}
                className="w-10 h-10 rounded-md mr-3 ml-2"
              />
            ) : (
              <View className="w-10 h-10 mr-3 items-center justify-between ml-2">
                <MaterialIcon name="place" size={40} color="#000" />
              </View>
            )}
            <View className="flex-1">
              <Text
                className="font-JakartaSemiBold text-base"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.name}
              </Text>
              <View className="flex-row items-center">
                <Icon
                  name="tag"
                  size={12}
                  color="#0286FF"
                  testID="category-icon"
                />
                <Text className="text-xs font-JakartaMedium text-secondary-600 ml-1">
                  {item.category}
                </Text>
              </View>
            </View>
          </View>
        )}
        onEdit={handleEdit}
        onAdd={handleAdd}
        isListEmpty={fullActivities.length === 0}
      />

      <Divider />

      {/* Restaurant section */}
      <TripSection
        sectionTitle="Restaurants"
        data={fullRestaurants}
        renderItem={({ item }: { item: any }) => (
          <View className="flex-row items-center p-2 bg-gray-50 rounded-xl">
            {!!item.image ? (
              <Image
                source={item.image}
                className="w-10 h-10 rounded-md mr-3 ml-2"
              />
            ) : (
              <View className="w-10 h-10 mr-3 items-center justify-between ml-2">
                <MaterialIcon name="restaurant" size={40} color="#000" />
              </View>
            )}
            <View className="flex-1">
              <Text
                className="font-JakartaSemiBold text-base"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.name}
              </Text>
              <View className="flex-row items-center justify-between w-full">
                <View className="flex-row items-center">
                  <Text className="text-xs font-JakartaMedium text-secondary-600 mr-1">
                    {item.rating}
                  </Text>
                  <Icon
                    name="star"
                    size={14}
                    color="#22C55E"
                    testID="rating-icon"
                  />
                </View>
                <View className="flex-row items-center">
                  <MaterialIcon name="food-bank" size={16} color="#000" />
                  <Text className="text-xs font-JakartaSemiBold text-secondary-600 mr-3 ml-1">
                    {item.cuisine}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
        onEdit={handleEdit}
        onAdd={handleAdd}
        isListEmpty={fullRestaurants.length === 0}
      />

      <Divider />

      {/* Accommodation section */}
      <TripSection
        sectionTitle="Accommodations"
        data={fullAccommodations}
        renderItem={({ item }: { item: any }) => (
          <View className="flex-row items-center p-2 bg-gray-50 rounded-xl">
            {!!item.image ? (
              <Image
                source={item.image}
                className="w-10 h-10 rounded-md mr-3 ml-2"
              />
            ) : (
              <View className="w-10 h-10 mr-3 items-center justify-between ml-2">
                <MaterialIcon name="hotel" size={40} color="#000" />
              </View>
            )}
            <View className="flex-1">
              <Text
                className="font-JakartaSemiBold text-base"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.name}
              </Text>
              <View className="flex-row justify-between items-center w-full">
                <View className="flex-row items-center">
                  <Text className="text-xs font-JakartaMedium text-secondary-600 mr-1">
                    {item.rating}
                  </Text>
                  <Icon
                    name="star"
                    size={14}
                    color="#22C55E"
                    testID="rating-icon"
                  />
                </View>
                <Text className="text-xs font-JakartaSemiBold text-secondary-600 mr-3">
                  ${item.pricePerNight}/night
                </Text>
              </View>
            </View>
          </View>
        )}
        onEdit={handleEdit}
        onAdd={handleAdd}
        isListEmpty={fullAccommodations.length === 0}
      />
      <Divider />
    </View>
  );
};

export default TripCityBlock;
