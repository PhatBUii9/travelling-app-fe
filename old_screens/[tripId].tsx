import { useLocalSearchParams } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { mockTrips } from "@/data/mockTrip";
import Icon from "react-native-vector-icons/FontAwesome";
import MemberAvatar from "@/components/trip/MemberAvatar";
import { useLayoutEffect, useState } from "react";
import { Trip } from "@/types/type";
import { useNavigation } from "expo-router";
import { SheetManager } from "react-native-actions-sheet";

const TripDetail = () => {
  const { tripId } = useLocalSearchParams();
  const trip = mockTrips.find((t) => t.id === tripId);
  const [isExtended, setIsExtended] = useState(false);
  const navigation = useNavigation();

  const expandMember = () => {
    setIsExtended(true);
  };

  const handleModifyCard = () => {
    console.log("Share, Edit, or Delete.");
    SheetManager.show("trip-actions");
  };

  if (!trip) {
    return <Text>Data is not available</Text>;
  }

  const getStatusStyles = (status: Trip["status"]) => {
    switch (status) {
      case "completed":
        return ["text-black", "bg-gray-200"];
      case "cancelled":
        return ["text-black", "bg-red-100"];
      default:
        return ["text-black", "bg-green-100"];
    }
  };
  const [statusTextColor, statusBgColor] = getStatusStyles(trip.status);

  const visibleMembers = trip.members?.slice(0, 4) || [];
  const extraCount = (trip.members?.length || 0) - visibleMembers.length;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleModifyCard}>
          <Icon
            name="ellipsis-h"
            size={20}
            color="#000"
            style={{ marginRight: 8 }}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  const renderFooter = () =>
    extraCount > 0 ? (
      <TouchableOpacity onPress={expandMember}>
        <View className="w-12 h-12 rounded-full bg-gray-300 items-center justify-center">
          <Text className="text-sm text-black font-medium">+{extraCount}</Text>
        </View>
      </TouchableOpacity>
    ) : null;

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
        {isExtended ? (
          <View className="flex-row flex-wrap justify-start gap-4">
            {trip.members?.map((item) => {
              return <MemberAvatar key={item.id} member={item} />;
            })}
          </View>
        ) : (
          <FlatList
            data={visibleMembers}
            horizontal
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            className="mb-4"
            renderItem={({ item }) => {
              return <MemberAvatar member={item} />;
            }}
            ListFooterComponent={renderFooter}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TripDetail;
