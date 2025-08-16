import RestaurantCard from "@/components/card/RestaurantCard";
import TripSelectionScreen from "@/components/screen/TripSelectionScreen";
import { ROUTES } from "@/constant/routes";
import { mockRestaurants } from "@/data/mockRestaurants";
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

const SelectRestaurantsScreen = () => {
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
    currentPlanner?.restaurants ?? [],
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // preload depending on mode
  useEffect(() => {
    (async () => {
      if (isEditingSaved && tripId && cityId) {
        const trip = await getTripById(tripId);
        const city = trip?.cities?.find((c) => c.cityId === cityId);
        setSelectedIds((city?.restaurants as string[]) ?? []);
      } else {
        setSelectedIds(currentPlanner?.restaurants ?? []);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingSaved, tripId, cityId, currentPlanner?.restaurants]);

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
      mockRestaurants.filter(
        (r) =>
          r.cityId === cityId &&
          r.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [cityId, searchTerm],
  );

  // ---- edit-saved: persist then replace -> Accommodation ----
  const saveAndGoNextSavedTrip = async (newRestaurantIds: string[]) => {
    if (!tripId || !cityId) return;
    const trip = await getTripById(tripId);
    if (!trip) return;

    const nextCities: CityBlock[] = (trip.cities || []).map((c) =>
      c.cityId === cityId ? { ...c, restaurants: newRestaurantIds } : c,
    );

    await updateTripStorage(tripId, {
      cities: nextCities,
      updatedAt: new Date().toISOString(),
    } as Partial<TripDraft>);

    router.replace({
      pathname: ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_ACCOMMODATION,
      params: { mode: "edit-saved", tripId, cityId },
    });
  };

  const handleContinue = async () => {
    if (!cityId) return;

    if (isEditingSaved) {
      await saveAndGoNextSavedTrip(selectedIds);
      return;
    }

    // planner flow
    updateCity(cityId, { restaurants: selectedIds });
    if (options !== "create") {
      router.push(ROUTES.ROOT.TRIPS.PLAN_TRIP.TRIP_REVIEW);
    } else {
      router.push({
        pathname: ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_ACCOMMODATION,
        params: { cityId, options },
      });
    }
  };

  const handleSkip = async () => {
    if (!cityId) return;

    if (isEditingSaved) {
      await saveAndGoNextSavedTrip([]); // clear restaurants for this city
      return;
    }

    updateCity(cityId, { restaurants: [] });
    router.push({
      pathname: ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_ACCOMMODATION,
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
        currentStep={5}
        totalStep={6}
        title="Select Restaurants"
        subtitle={
          isEditingSaved
            ? "Select your preferred dining spots (optional)"
            : `Select your preferred dining spots in ${currentPlanner?.cityName ?? ""} (optional)`
        }
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
