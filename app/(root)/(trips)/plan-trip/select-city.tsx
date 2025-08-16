import CityCard from "@/components/card/CityCard";
import TripSelectionScreen from "@/components/screen/TripSelectionScreen";
import { ROUTES } from "@/constant/routes";
import { mockCities } from "@/data/mockCities";
import { useTripPlanner } from "@/hooks/useTripPlanner";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  getTripById,
  updateTrip as updateTripStorage,
} from "@/utils/tripStorage";
import { CityBlock, TripDraft } from "@/types/type";

type Params = {
  mode?: string; // "edit-saved" when adding to a persisted trip
  tripId?: string | string[]; // saved trip id
};

const SelectCityScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // planner context (kept for normal create-trip flow)
  const { currentCityId, cities, addCity, setCurrentCity } = useTripPlanner();

  // params
  const { mode, tripId: rawTripId } = useLocalSearchParams<Params>();
  const isEditingSaved = mode === "edit-saved";
  const tripId = useMemo(
    () => (Array.isArray(rawTripId) ? rawTripId[0] : rawTripId) ?? "",
    [rawTripId],
  );

  const filteredData = useMemo(
    () =>
      mockCities.filter((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [searchTerm],
  );

  const handleContinue = async () => {
    if (!selectedId) return;

    const city = mockCities.find((c) => c.id === selectedId);
    if (!city) return;

    // New city block in APP STATE (uses Date to match CityBlock type)
    const newCity: CityBlock = {
      cityId: city.id,
      cityName: city.name,
      country: city.country,
      imageURL: city.image,
      startDate: new Date(),
      endDate: new Date(),
      activities: [],
      restaurants: [],
      accommodations: [],
    };

    // -------------------- EDIT-SAVED MODE --------------------
    if (isEditingSaved && tripId) {
      const trip = await getTripById(tripId);
      if (!trip) return;

      // trip.cities are CityBlock[] (startDate/endDate are Date) thanks to your storage mappers
      const exists = (trip.cities ?? []).some((c) => c.cityId === city.id);
      const nextCities: CityBlock[] = exists
        ? trip.cities
        : [...(trip.cities ?? []), newCity];

      // recompute overall range from Date objects
      if (nextCities.length > 0) {
        const startMs = Math.min(
          ...nextCities.map((c) => c.startDate.getTime()),
        );
        const endMs = Math.max(...nextCities.map((c) => c.endDate.getTime()));
        await updateTripStorage(tripId, {
          cities: nextCities,
          startDate: new Date(startMs).toISOString(),
          endDate: new Date(endMs).toISOString(),
          updatedAt: new Date().toISOString(),
        } as Partial<TripDraft>);
      } else {
        await updateTripStorage(tripId, {
          cities: nextCities,
          updatedAt: new Date().toISOString(),
        } as Partial<TripDraft>);
      }

      // continue editing this city in activities with edit-saved mode
      router.push({
        pathname: ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_ACTIVITIES,
        params: { mode: "edit-saved", tripId, cityId: city.id },
      });
      return;
    }

    // -------------------- PLANNER FLOW (existing) --------------------
    const existedCity = cities.find((c) => c.cityId === selectedId);
    setCurrentCity(city.id);
    if (!existedCity) {
      addCity(newCity);
    }

    router.push({
      pathname: ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_ACTIVITIES,
      params: { options: "create", cityId: city.id },
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, [currentCityId, searchTerm]);

  return (
    <TripSelectionScreen
      currentStep={2}
      totalStep={6}
      title="Select City"
      subtitle={
        isEditingSaved
          ? "Pick a city to add to your trip"
          : "Choose a city to start building your trip"
      }
      searchTerm={searchTerm}
      onSearchTermChange={setSearchTerm}
      data={filteredData}
      sectionTitle="Popular Cities"
      selectedId={selectedId ?? undefined}
      isLoading={isLoading}
      renderItem={({ item }: { item: any }) => (
        <CityCard
          city={item.name}
          country={item.country}
          imageURL={item.image}
          selected={item.id === selectedId}
          onPress={() => setSelectedId(item.id)}
        />
      )}
      onContinue={handleContinue}
      error={!selectedId ? "Please select an option to continue." : undefined}
    />
  );
};

export default SelectCityScreen;
