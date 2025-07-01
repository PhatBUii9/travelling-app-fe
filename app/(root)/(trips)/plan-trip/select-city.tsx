import CityCard from "@/components/card/CityCard";
import CustomButton from "@/components/common/CustomButton";
import ProgressBar from "@/components/common/PorgressBar";
import ScreenContainer from "@/components/common/ScreenContainer";
import SearchBar from "@/components/common/SearchBar";
import { ROUTES } from "@/constant/routes";
import { mockCities } from "@/data/mockCities";
import { useTripPlanner } from "@/hooks/useTripPlanner";
import { router } from "expo-router";
import { useState } from "react";
import { View, Text, FlatList } from "react-native";

const SelectCityScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { cities, addCity, setCurrentCity } = useTripPlanner();

  const data = mockCities.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleContinue = () => {
    if (selectedId === null) return;

    const city = mockCities.find((c) => c.id === selectedId)!;
    const payload = {
      cityId: city.id,
      cityName: city.name,
      country: city.country,
      imageURL: city.image,
      startDate: "",
      endDate: "",
      places: [],
      restaurants: [],
      accommodations: [],
    };

    const existedCity = cities.find((c) => c.cityId === selectedId);
    setCurrentCity(city.id);

    if (!existedCity) addCity(payload);

    router.push(ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_PLACES);
  };

  return (
    <>
      <ProgressBar currentStep={2} totalSteps={6} />
      <ScreenContainer scrollable={false}>
        <View className="flex-1 py-1 px-4">
          <View className="items-center mx-8 mb-8">
            <Text className="font-JakartaExtraBold text-heading-lg mb-3">
              Select Cities
            </Text>
            <Text className="text-base text-center font-JakartaMedium text-secondary-700 ">
              Choose a city to start building your trip.
            </Text>
          </View>

          <SearchBar
            placeholder="Search city..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            className="mb-8"
            testID="search-bar"
          />

          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View className="h-3" />}
            showsVerticalScrollIndicator={false}
            testID="cities"
            renderItem={({ item }) => (
              <CityCard
                city={item.name}
                country={item.country}
                imageURL={item.image}
                selected={item.id === selectedId}
                onPress={() => setSelectedId(item.id)}
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
        </View>
        <View className="w-full px-4">
          <CustomButton
            title="Continue"
            onPress={handleContinue}
            disabled={selectedId === null}
            className={`rounded-xl ${
              selectedId === null ? "bg-gray-300" : "bg-blue-500"
            }`}
            textVariant="default"
            testID="continue-button"
          />
          {selectedId === null && (
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

export default SelectCityScreen;
