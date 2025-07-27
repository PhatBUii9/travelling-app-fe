import TripSelectionScreen from "@/components/screen/TripSelectionScreen";
import ActivitiesCard from "@/components/card/ActivitiesCard";
import { ROUTES } from "@/constant/routes";
import { useTripPlanner } from "@/hooks/useTripPlanner";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { mockActivities } from "@/data/mockActivities";

const SelectActivitiesScreen = () => {
  const { cities, setCurrentCity, updateCity } = useTripPlanner();
  const { cityId: rawCityId, options } = useLocalSearchParams();

  // Always extract string from cityId param (may be array)
  const cityId = Array.isArray(rawCityId) ? rawCityId[0] : rawCityId;

  // Always get the correct city by cityId param
  const current = cities.find((c) => c.cityId === cityId);

  // Initialize selectedIds from the correct city's activities
  const [selectedIds, setSelectedIds] = useState<string[]>(
    current?.activities ?? [],
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // On cityId change, set context and sync local selection state
  useEffect(() => {
    if (cityId) setCurrentCity(cityId);
    setSelectedIds(current?.activities ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityId, current?.activities, setCurrentCity]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, [cityId, searchTerm]);

  // Only show activities for the correct city
  const data = mockActivities.filter(
    (activity) =>
      activity.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      activity.cityId === cityId,
  );

  const handleContinue = () => {
    if (!cityId || selectedIds.length === 0) return;
    updateCity(cityId, { activities: selectedIds });
    if (options === "edit") {
      router.push(ROUTES.ROOT.TRIPS.PLAN_TRIP.TRIP_REVIEW);
    } else {
      router.push(ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_DATES);
    }
  };

  if (!current) return null;

  return (
    <TripSelectionScreen
      currentStep={3}
      totalStep={6}
      title="Select Activities"
      subtitle="Choose from these points of interest to visit during your trip."
      sectionTitle="Popular Activities"
      searchTerm={searchTerm}
      onSearchTermChange={setSearchTerm}
      data={data}
      selectedIds={selectedIds}
      onContinue={handleContinue}
      isLoading={isLoading}
      renderItem={({ item }: { item: any }) => (
        <ActivitiesCard
          id={item.id}
          name={item.name}
          category={item.category}
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
      error={
        selectedIds.length === 0
          ? "Please select an option to continue."
          : undefined
      }
    />
  );
};

export default SelectActivitiesScreen;
