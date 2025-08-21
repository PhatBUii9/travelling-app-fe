import TripSelectionScreen from "@/components/screen/TripSelectionScreen";
import ActivitiesCard from "@/components/card/ActivitiesCard";
import { ROUTES } from "@/constant/routes";
import { useTripPlanner } from "@/hooks/useTripPlanner";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  getTripById,
  updateTrip as updateTripStorage,
} from "@/utils/tripStorage";
import { mockActivities } from "@/data/mockActivities";
import type { CityBlock, TripDraft } from "@/types/type";

type Params = {
  cityId?: string | string[];
  options?: string; // "create" in planner flow
  mode?: string; // "edit-saved" when editing a persisted trip
  tripId?: string | string[]; // saved trip id
};

const SelectActivitiesScreen = () => {
  const { cities, setCurrentCity, updateCity } = useTripPlanner();
  const {
    cityId: rawCityId,
    options,
    mode,
    tripId: rawTripId,
  } = useLocalSearchParams<Params>();

  const cityId = useMemo(
    () => (Array.isArray(rawCityId) ? rawCityId[0] : rawCityId) ?? "",
    [rawCityId],
  );
  const tripId = useMemo(
    () => (Array.isArray(rawTripId) ? rawTripId[0] : rawTripId) ?? "",
    [rawTripId],
  );
  const isEditingSaved = mode === "edit-saved";

  const currentPlanner = cities.find((c) => c.cityId === cityId);

  const [selectedIds, setSelectedIds] = useState<string[]>(
    currentPlanner?.activities ?? [],
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Prefill selection & keep planner context current city when needed
  useEffect(() => {
    (async () => {
      if (isEditingSaved && tripId && cityId) {
        const trip = await getTripById(tripId);
        const city = trip?.cities?.find((c) => c.cityId === cityId);
        setSelectedIds((city?.activities as string[]) ?? []);
      } else {
        setSelectedIds(currentPlanner?.activities ?? []);
        if (cityId && currentPlanner?.cityId !== cityId) {
          setCurrentCity(cityId);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingSaved, tripId, cityId, currentPlanner?.activities]);

  // Loading shimmer on search/city change
  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(t);
  }, [cityId, searchTerm]);

  const data = useMemo(
    () =>
      mockActivities.filter(
        (a) =>
          a.cityId === cityId &&
          a.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [cityId, searchTerm],
  );

  // ---- edit-saved: save to storage then replace -> Dates ----
  const saveAndGoNextSavedTrip = async (newActivityIds: string[]) => {
    if (!tripId || !cityId) return;
    const trip = await getTripById(tripId);
    if (!trip) return;

    const nextCities: CityBlock[] = (trip.cities || []).map((c) =>
      c.cityId === cityId ? { ...c, activities: newActivityIds } : c,
    );

    await updateTripStorage(tripId, {
      cities: nextCities,
      updatedAt: new Date().toISOString(),
    } as Partial<TripDraft>);

    router.replace({
      pathname: ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_DATES,
      params: { mode: "edit-saved", tripId, cityId },
    });
  };

  const handleContinue = async () => {
    if (!cityId || selectedIds.length === 0) return;

    if (isEditingSaved) {
      await saveAndGoNextSavedTrip(selectedIds);
      return;
    }

    // ---- planner flow: update context then push -> Dates ----
    updateCity(cityId, { activities: selectedIds });
    router.push({
      pathname: ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_DATES,
      params: { cityId, options: "create" },
    });
  };

  // In planner mode, guard against missing city in context
  if (!isEditingSaved && !currentPlanner) return null;

  return (
    <TripSelectionScreen
      currentStep={3}
      totalStep={6}
      title="Select Activities"
      subtitle={
        isEditingSaved
          ? "Choose activities to add (optional)"
          : "Choose from these points of interest to visit during your trip."
      }
      sectionTitle="Popular Activities"
      searchTerm={searchTerm}
      onSearchTermChange={setSearchTerm}
      data={data}
      selectedIds={selectedIds}
      onContinue={handleContinue}
      isLoading={isLoading}
      error={
        selectedIds.length === 0
          ? "Please select an option to continue."
          : undefined
      }
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
    />
  );
};

export default SelectActivitiesScreen;
