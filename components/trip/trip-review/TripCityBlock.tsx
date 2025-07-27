import { mockActivities } from "@/data/mockActivities";
import { mockRestaurants } from "@/data/mockRestaurants";
import { mockAccommodations } from "@/data/mockAccommodations";
import { View, Text, TouchableOpacity, Image } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/FontAwesome";
import { SectionProps, TripCityBlockProps } from "@/types/type";

function formatDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const Divider = () => (
  <View className="h-1 w-full bg-gray-100 rounded-full my-2" />
);

const Section = ({
  title,
  data,
  renderItem,
  onAdd,
  onEdit,
  isListEmpty,
}: SectionProps) => (
  <View className="mb-2">
    <View className="flex-row justify-between items-center mb-1">
      <Text className="text-lg font-JakartaSemiBold">{title}</Text>
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
    <View>
      {data.length === 0 ? (
        <Text className="text-sm text-secondary-400 ml-2">
          No {title.toLowerCase()} selected
        </Text>
      ) : (
        data.map(renderItem)
      )}
    </View>
  </View>
);

const TripCityBlock = ({
  cityId,
  cityName,
  startDate,
  endDate,
  country,
  activities,
  restaurants,
  accommodations,
  onEdit,
  onAdd,
  onDelete,
  expanded,
  onToggleExpand,
}: TripCityBlockProps) => {
  const fullActivities = activities
    .map((id) => mockActivities.find((a) => a.id === id))
    .filter(Boolean);

  const fullRestaurants = (restaurants ?? [])
    .map((id) => mockRestaurants.find((a) => a.id === id))
    .filter(Boolean);

  const fullAccommodations = (accommodations ?? [])
    .map((id) => mockAccommodations.find((a) => a.id === id))
    .filter(Boolean);

  return (
    <View className="bg-white px-4 pb-4 pt-2 rounded-3xl mb-4">
      <TouchableOpacity
        className="flex-row items-center justify-between mb-1"
        onPress={onToggleExpand}
        activeOpacity={onToggleExpand ? 0.7 : 1}
      >
        <View className="flex-row items-end">
          <Text className="text-heading-md font-JakartaBold mr-3">
            {cityName}
          </Text>
          <Text className="text-base font-JakartaSemiBold text-secondary-500">
            {country}
          </Text>
        </View>

        {onToggleExpand && (
          <MaterialIcon
            name={expanded ? "expand-less" : "expand-more"}
            size={28}
            color="#0286FF"
          />
        )}
      </TouchableOpacity>
      <View className="flex-row items-end justify-between mb-5">
        <Text className="text-md font-JakartaSemiBold text-secondary-600">
          {formatDate(startDate)} - {formatDate(endDate)}
        </Text>
        <TouchableOpacity onPress={onDelete} accessibilityLabel="Remove city">
          <Icon name="trash" size={24} color="#FF0000" />
        </TouchableOpacity>
      </View>

      {/* Render sections only if expanded, or always if not using accordion */}
      {expanded !== false && (
        <>
          <Section
            title="Activities"
            data={fullActivities}
            isListEmpty={fullActivities.length === 0}
            onAdd={() => onAdd({ cityId, type: "activity" })}
            onEdit={() => onEdit({ cityId, type: "activity" })}
            renderItem={(item: any) => (
              <View
                key={item.id}
                className="flex-row items-center p-2 bg-gray-50 rounded-xl mb-1"
              >
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
          />
          <Divider />

          <Section
            title="Restaurants"
            data={fullRestaurants}
            isListEmpty={fullRestaurants.length === 0}
            onAdd={() => onAdd({ cityId, type: "restaurant" })}
            onEdit={() => onEdit({ cityId, type: "restaurant" })}
            renderItem={(item: any) => (
              <View
                key={item.id}
                className="flex-row items-center p-2 bg-gray-50 rounded-xl mb-1"
              >
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
          />
          <Divider />

          <Section
            title="Accommodations"
            data={fullAccommodations}
            isListEmpty={fullAccommodations.length === 0}
            onAdd={() => onAdd({ cityId, type: "accommodation" })}
            onEdit={() => onEdit({ cityId, type: "accommodation" })}
            renderItem={(item: any) => (
              <View
                key={item.id}
                className="flex-row items-center p-2 bg-gray-50 rounded-xl mb-1"
              >
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
          />
        </>
      )}
    </View>
  );
};

export default TripCityBlock;
