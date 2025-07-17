import AccommodationCard from "@/components/card/AccommodationCard";
import TripSelectionScreen from "@/components/screen/TripSelectionScreen";
import { ROUTES } from "@/constant/routes";
import { mockAccommodations } from "@/data/mockAccommodations";
import { useTripPlanner } from "@/hooks/useTripPlanner";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";

const SelectAccommodationScreen = () => {
  const { cities, currentCityId, updateCity } = useTripPlanner();
  const current = cities.find((c) => c.cityId === currentCityId);

  const [selectedIds, setSelectedIds] = useState<string[]>(
    current?.accommodations ?? [],
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const data = mockAccommodations.filter(
    (acc) =>
      acc.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      acc.cityId === currentCityId,
  );

  const handleContinue = () => {
    if (!currentCityId) return;
    updateCity(currentCityId, { restaurants: selectedIds });
    router.push(ROUTES.ROOT.TRIPS.PLAN_TRIP.TRIP_REVIEW);
  };

  useEffect(() => {
    setSelectedIds(current?.accommodations ?? []);
  }, [current?.accommodations]);

  if (!current) return null;

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                if (!currentCityId) return;
                router.push(ROUTES.ROOT.TRIPS.PLAN_TRIP.TRIP_REVIEW);
                updateCity(currentCityId, { accommodations: [] });
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
        title="Select Accommodations"
        subtitle={`Choose wher you will stay in ${current.cityName} (optional)`}
        sectionTitle="Popular Accommodations"
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        data={data}
        selectedIds={selectedIds}
        onContinue={handleContinue}
        isLoading={isLoading}
        renderItem={({ item }) => (
          <AccommodationCard
            id={item.id}
            name={item.name}
            rating={item.rating}
            pricePerNight={item.pricePerNight}
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

export default SelectAccommodationScreen;
