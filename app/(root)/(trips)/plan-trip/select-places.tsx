import PlaceCard from "@/components/card/PlaceCard";
import TripLoadingSkeleton from "@/components/card/TripLoadingSkeleton";
import CustomButton from "@/components/common/CustomButton";
import ProgressBar from "@/components/common/PorgressBar";
import ScreenContainer from "@/components/common/ScreenContainer";
import SearchBar from "@/components/common/SearchBar";
import { ROUTES } from "@/constant/routes";
import { mockPlaces } from "@/data/mockPlaces";
import { useTripPlanner } from "@/hooks/useTripPlanner";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";

const SelectPlacesScreen = () => {
  const SKELETON_COUNT = 4;
  const skeletonData = Array.from({ length: SKELETON_COUNT });

  const { cities, currentCityId, updateCity } = useTripPlanner();
  const current = cities.find((c) => c.cityId === currentCityId);

  const [selectedIds, setSelectedIds] = useState<string[]>(
    current?.places ?? [],
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const data = mockPlaces.filter((place) =>
    place.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleContinue = () => {
    if (!currentCityId || selectedIds.length === 0) return;
    updateCity(currentCityId, { places: selectedIds });
    router.push(ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_DATES);
  };

  useEffect(() => {
    setSelectedIds(current?.places ?? []);
  }, [current?.places]);

  if (!current) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg font-JakartaMedium">No city selected</Text>
      </View>
    );
  }

  return (
    <>
      <ProgressBar currentStep={3} totalSteps={6} />
      <ScreenContainer scrollable={false}>
        <View className="flex-1 py-1 px-4">
          <View className="items-center mx-8 mb-8">
            <Text className="font-JakartaExtraBold text-heading-lg mb-3">
              Select Places
            </Text>
            <Text className="text-base text-center font-JakartaMedium text-secondary-700 ">
              Choose from these points of interest to visit during your trip.
            </Text>
          </View>

          <SearchBar
            placeholder="Search places..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            className="mb-8"
            testID="search-bar"
          />

          {isLoading ? (
            <FlatList
              data={skeletonData}
              keyExtractor={(_, i) => `skel-${i}`}
              renderItem={() => <TripLoadingSkeleton />}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View className="h-3" />}
              showsVerticalScrollIndicator={false}
              testID="place-list"
              renderItem={({ item }) => (
                <PlaceCard
                  id={item.id}
                  name={item.name}
                  category={item.category}
                  imageURL={item.image}
                  selected={selectedIds.includes(item.id)}
                  onPress={() => {
                    setSelectedIds((prev) => {
                      if (prev.includes(item.id)) {
                        // remove
                        return prev.filter((id) => id !== item.id);
                      } else {
                        // add
                        return [...prev, item.id];
                      }
                    });
                  }}
                />
              )}
              ListEmptyComponent={() => (
                <View className="w-full items-center mt-8">
                  <Text
                    className="text-center font-JakartaMedium text-md"
                    testID="no-result"
                  >
                    No result
                  </Text>
                </View>
              )}
            />
          )}
        </View>
        <View className="w-full px-4">
          <CustomButton
            title="Continue"
            onPress={handleContinue}
            disabled={selectedIds.length === 0}
            className={`rounded-xl ${
              selectedIds.length === 0 ? "bg-gray-300" : "bg-blue-500"
            }`}
            textVariant="default"
            testID="continue-button"
          />
          {selectedIds.length === 0 && (
            <Text
              className="text-sm text-red-500 text-center"
              testID="Continue"
            >
              Please select an option to continue.
            </Text>
          )}
        </View>
      </ScreenContainer>
    </>
  );
};

export default SelectPlacesScreen;
