import RestaurantCard from "@/components/card/RestaurantCard";
import TripSelectionScreen from "@/components/screen/TripSelectionScreen";
import { ROUTES } from "@/constant/routes";
import { mockRestaurants } from "@/data/mockRestaurants";
import { useTripPlanner } from "@/hooks/useTripPlanner";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";

const SelectRestaurantsScreen = () => {
  const { cities, currentCityId, updateCity } = useTripPlanner();
  const current = cities.find((c) => c.cityId === currentCityId);

  const [selectedIds, setSelectedIds] = useState<string[]>(
    current?.restaurants ?? [],
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const data = mockRestaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      restaurant.cityId === currentCityId,
  );

  const handleContinue = () => {
    if (!currentCityId) return;
    updateCity(currentCityId, { restaurants: selectedIds });
    router.push(ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_ACCOMMODATION);
  };

  useEffect(() => {
    setSelectedIds(current?.restaurants ?? []);
  }, [current?.restaurants]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, [currentCityId]);

  if (!current) return null;

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                if (!currentCityId) return;
                router.push(ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_ACCOMMODATION);
                updateCity(currentCityId, { restaurants: [] });
              }}
              style={{ paddingHorizontal: 5 }}
            >
              <Text>Skip</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <TripSelectionScreen
        currentStep={5}
        totalStep={6}
        title="Select Restaurants"
        subtitle={`Select your preferred dining spots in ${current.cityName} (optional)`}
        sectionTitle="Popular Restaurants"
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        data={data}
        selectedIds={selectedIds}
        onContinue={handleContinue}
        isLoading={isLoading}
        renderItem={({ item }: { item: any }) => (
          <RestaurantCard
            id={item.id}
            name={item.name}
            rating={item.rating}
            cuisine={item.cuisine}
            imageURL={item.image}
            selected={selectedIds.includes(item.id)}
            onPress={() =>
              setSelectedIds((prev) =>
                prev.includes(item.id)
                  ? prev.filter((id) => id !== item.id)
                  : [...prev, item.id],
              )
            }
          />
        )}
      />
    </>
  );
};

export default SelectRestaurantsScreen;
