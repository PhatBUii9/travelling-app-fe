import AccommodationCard from "@/components/card/AccommodationCard";
import TripSelectionScreen from "@/components/screen/TripSelectionScreen";
import { ROUTES } from "@/constant/routes";
import { mockAccommodations } from "@/data/mockAccommodations";
import { useTripPlanner } from "@/hooks/useTripPlanner";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import {
  getTripById,
  updateTrip as updateTripStorage,
} from "@/utils/tripStorage";
import type { CityBlock, TripDraft } from "@/types/type";

type Params = {
  cityId?: string | string[];
  options?: string; // "create" for planner flow
  mode?: string; // "edit-saved" when editing a persisted trip
  tripId?: string | string[]; // saved trip id
};

const SelectAccommodationScreen = () => {
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

  // selection state
  const [selectedIds, setSelectedIds] = useState<string[]>(
    currentPlanner?.accommodations ?? [],
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // preload depending on mode
  useEffect(() => {
    (async () => {
      if (isEditingSaved && tripId && cityId) {
        const trip = await getTripById(tripId);
        const city = trip?.cities?.find((c) => c.cityId === cityId);
        setSelectedIds((city?.accommodations as string[]) ?? []);
      } else {
        setSelectedIds(currentPlanner?.accommodations ?? []);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingSaved, tripId, cityId, currentPlanner?.accommodations]);

  // keep planner context current city (only in planner mode)
  useEffect(() => {
    if (!isEditingSaved && cityId && currentPlanner?.cityId !== cityId) {
      setCurrentCity(cityId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityId, isEditingSaved]);

  // search/loading shimmer
  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(t);
  }, [cityId, searchTerm]);

  const data = useMemo(
    () =>
      mockAccommodations.filter(
        (a) =>
          a.cityId === cityId &&
          a.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [cityId, searchTerm],
  );

  // ---- edit-saved: persist then back -> Trip Detail ----
  const saveAndFinishSavedTrip = async (newAccommodationIds: string[]) => {
    if (!tripId || !cityId) return;
    const trip = await getTripById(tripId);
    if (!trip) return;

    const nextCities: CityBlock[] = (trip.cities || []).map((c) =>
      c.cityId === cityId ? { ...c, accommodations: newAccommodationIds } : c,
    );

    await updateTripStorage(tripId, {
      cities: nextCities,
      updatedAt: new Date().toISOString(),
    } as Partial<TripDraft>);

    // Previous steps used `replace`, so a single back returns to Trip Detail
    router.back();
  };

  const handleContinue = async () => {
    if (!cityId) return;

    if (isEditingSaved) {
      await saveAndFinishSavedTrip(selectedIds);
      return;
    }

    // planner flow: finish wizard step then go to review
    updateCity(cityId, { accommodations: selectedIds });
    if (options !== "create") {
      router.push(ROUTES.ROOT.TRIPS.PLAN_TRIP.TRIP_REVIEW);
    } else {
      router.push({
        pathname: ROUTES.ROOT.TRIPS.PLAN_TRIP.TRIP_REVIEW,
        params: { cityId, options },
      });
    }
  };

  const handleSkip = async () => {
    if (!cityId) return;

    if (isEditingSaved) {
      await saveAndFinishSavedTrip([]); // clear accommodations for this city
      return;
    }

    updateCity(cityId, { accommodations: [] });
    router.push({
      pathname: ROUTES.ROOT.TRIPS.PLAN_TRIP.TRIP_REVIEW,
      params: { cityId, options: "create" },
    });
  };

  if (!isEditingSaved && !currentPlanner) return null;

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={handleSkip}
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
        subtitle={
          isEditingSaved
            ? "Choose where you will stay (optional)"
            : `Choose where you will stay in ${currentPlanner?.cityName ?? ""} (optional)`
        }
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
