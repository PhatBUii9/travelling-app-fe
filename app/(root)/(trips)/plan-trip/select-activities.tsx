import TripSelectionScreen from "@/components/screen/TripSelectionScreen";
import ActivitiesCard from "@/components/card/ActivitiesCard";
import { ROUTES } from "@/constant/routes";
import { useTripPlanner } from "@/hooks/useTripPlanner";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { mockActivities } from "@/data/mockActivities";

const SelectActivitiesScreen = () => {
  const { cities, currentCityId, updateCity } = useTripPlanner();
  const current = cities.find((c) => c.cityId === currentCityId);

  const [selectedIds, setSelectedIds] = useState<string[]>(
    current?.activities ?? [],
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const data = mockActivities.filter(
    (activity) =>
      activity.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      activity.cityId === currentCityId,
  );

  const handleContinue = () => {
    if (!currentCityId || selectedIds.length === 0) return;
    updateCity(currentCityId, { activities: selectedIds });
    router.push(ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_DATES);
  };

  useEffect(() => {
    setSelectedIds(current?.activities ?? []);
  }, [current?.activities]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [currentCityId]);

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
