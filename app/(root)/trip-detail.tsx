import { useLocalSearchParams } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  View,
  FlatList,
} from "react-native";
import { mockTrips } from "@/data/mockTrip";
import Icon from "react-native-vector-icons/FontAwesome";

const TripDetail = () => {
  const { tripId } = useLocalSearchParams();
  const trip = mockTrips.find((t) => t.id === tripId);

  if (!trip) {
    return <Text>Data is not available</Text>;
  }

  let statusTextColor = "text-black";
  let statusBgColor = "bg-green-100";

  switch (trip.status) {
    case "completed":
      statusTextColor = "text-black";
      statusBgColor = "bg-gray-200";
      break;
    case "cancelled":
      statusTextColor = "text-black";
      statusBgColor = "bg-red-100";
      break;
  }

  const visibleMembers = trip.members?.slice(0, 5) || [];
  const extraCount = (trip.members?.length || 0) - visibleMembers.length;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        className="px-10"
      >
        {/* Cover Image */}
        <View className="py-5">
          <Image
            source={
              typeof trip.imageUrl === "string"
                ? { uri: trip.imageUrl }
                : trip.imageUrl
            }
            className="w-full h-48 rounded-2xl"
            resizeMode="cover"
          />
        </View>

        {/* Trip Title + Location */}
        <View>
          <Text className="text-2xl font-bold text-center text-black">
            {trip.title}
          </Text>
          <Text className="text-center text-gray-700 mt-1">
            {trip.destination}
          </Text>
        </View>

        {/* Separator */}
        <View className="my-4 border-t border-gray-200" />

        {/* Dates */}
        <View className="flex-row justify-between items-center pl-4 my-2">
          <View className="flex-row items-center">
            <Icon
              name="calendar"
              size={20}
              color="#000"
              style={{ marginRight: 8 }}
            />
            <Text className="text-lg text-black">Dates</Text>
          </View>
          <Text className="text-base text-black">{trip.dates}</Text>
        </View>

        {/* Separator */}
        <View className="my-4 border-t border-gray-200" />

        {/* Status */}
        <View className="flex-row justify-between items-center pl-4 my-2">
          <View className="flex-row items-center">
            <Icon
              name="info-circle"
              size={20}
              color="#000"
              style={{ marginRight: 8 }}
            />
            <Text className="text-lg text-black">Status</Text>
          </View>
          <View className={`px-3 py-1 rounded-full ${statusBgColor}`}>
            <Text className={`text-xs font-bold ${statusTextColor}`}>
              {trip.status.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Separator */}
        <View className="my-4 border-t border-gray-200" />

        {/* Members Section */}
        <Text className="text-xl font-semibold text-black mb-2">Members</Text>
        <FlatList
          data={visibleMembers}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          className="mb-4"
          renderItem={({ item }) => {
            const hasAvatar = !!item.avatar;
            const initials = item.username
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return hasAvatar ? (
              <View className="items-center mr-4">
                <Image
                  source={{ uri: item.avatar }}
                  className="w-12 h-12 rounded-full"
                />
                <Text className="text-xs text-black mt-1">{item.username}</Text>
              </View>
            ) : (
              <View className="w-12 h-12 rounded-full bg-gray-700 items-center justify-center mr-4">
                <Text className="text-white text-sm font-bold">{initials}</Text>
              </View>
            );
          }}
          ListFooterComponent={
            extraCount > 0 ? (
              <View className="w-12 h-12 rounded-full bg-gray-300 items-center justify-center">
                <Text className="text-sm text-black font-medium">
                  +{extraCount}
                </Text>
              </View>
            ) : null
          }
        />

        {/* Separator */}
        <View className="my-4 border-t border-gray-200" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TripDetail;
