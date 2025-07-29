import AccommodationCard from "@/components/card/AccommodationCard";
import TripSelectionScreen from "@/components/screen/TripSelectionScreen";
import { ROUTES } from "@/constant/routes";
import { mockAccommodations } from "@/data/mockAccommodations";
import { useTripPlanner } from "@/hooks/useTripPlanner";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";

const SelectAccommodationScreen = () => {
  const { cities, setCurrentCity, updateCity } = useTripPlanner();

  const { cityId: rawCityId } = useLocalSearchParams();

  // Always extract string from cityId param (may be array)
  const cityId = Array.isArray(rawCityId) ? rawCityId[0] : rawCityId;
  const current = cities.find((c) => c.cityId === cityId);

  const [selectedIds, setSelectedIds] = useState<string[]>(
    current?.accommodations ?? [],
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const data = mockAccommodations.filter(
    (acc) =>
      acc.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      acc.cityId === cityId,
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
    if (!cityId) return;
    updateCity(cityId, { accommodations: selectedIds });
    router.push(ROUTES.ROOT.TRIPS.PLAN_TRIP.TRIP_REVIEW);
  };

  useEffect(() => {
    setSelectedIds(current?.accommodations ?? []);
  }, [current?.accommodations]);

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
                router.push(ROUTES.ROOT.TRIPS.PLAN_TRIP.TRIP_REVIEW);
                updateCity(cityId, { accommodations: [] });
              }}
              style={{ paddingHorizontal: 5 }}
            >
              <Text>Skip</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <TripSelectionScreen
        currentStep={6}
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
        renderItem={({ item }: { item: any }) => (
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
