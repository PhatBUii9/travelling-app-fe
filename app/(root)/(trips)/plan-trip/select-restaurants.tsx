import RestaurantCard from "@/components/card/RestaurantCard";
import TripSelectionScreen from "@/components/screen/TripSelectionScreen";
import { ROUTES } from "@/constant/routes";
import { mockRestaurants } from "@/data/mockRestaurants";
import { useTripPlanner } from "@/hooks/useTripPlanner";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";

const SelectRestaurantsScreen = () => {
  const { cities, setCurrentCity, updateCity } = useTripPlanner();

  const { cityId: rawCityId, options } = useLocalSearchParams();

  // Always extract string from cityId param (may be array)
  const cityId = Array.isArray(rawCityId) ? rawCityId[0] : rawCityId;

  const current = cities.find((c) => c.cityId === cityId);

  // Initialize selectedIds from the correct city's activities
  const [selectedIds, setSelectedIds] = useState<string[]>(
    current?.restaurants ?? [],
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const data = mockRestaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      restaurant.cityId === cityId,
  );

  // On cityId change, set context and sync local selection state
  useEffect(() => {
    if (cityId && current?.cityId !== cityId) {
      setCurrentCity(cityId);
    }
    // Only depends on cityId, not current?.activities!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityId]);

  const handleContinue = () => {
    if (!cityId || selectedIds.length === 0) return;
    updateCity(cityId, { restaurants: selectedIds });
    if (options === "edit") {
      router.push(ROUTES.ROOT.TRIPS.PLAN_TRIP.TRIP_REVIEW);
    } else {
      router.push({
        pathname: ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_ACCOMMODATION,
        params: { cityId, options },
      });
    }
  };

  useEffect(() => {
    setSelectedIds(current?.restaurants ?? []);
  }, [current?.restaurants]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, [cityId, searchTerm]);

  if (!current) return null;

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                if (!cityId) return;
                router.push(ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_ACCOMMODATION);
                updateCity(cityId, { restaurants: [] });
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
