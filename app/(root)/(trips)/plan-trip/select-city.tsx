import CityCard from "@/components/card/CityCard";
import TripSelectionScreen from "@/components/screen/TripSelectionScreen";
import { ROUTES } from "@/constant/routes";
import { mockCities } from "@/data/mockCities";
import { useTripPlanner } from "@/hooks/useTripPlanner";
import { router } from "expo-router";
import { useEffect, useState } from "react";

const SelectCityScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { currentCityId, cities, addCity, setCurrentCity } = useTripPlanner();
  const [isLoading, setIsLoading] = useState(false);

  const filteredData = mockCities.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleContinue = () => {
    if (!selectedId) return;

    const city = mockCities.find((c) => c.id === selectedId)!;

    const payload = {
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

    const existedCity = cities.find((c) => c.cityId === selectedId);

    setCurrentCity(city.id);

    if (!existedCity) addCity(payload);

    router.push({
      pathname: ROUTES.ROOT.TRIPS.PLAN_TRIP.SELECT_ACTIVITIES,
      params: { options: "create" },
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, [currentCityId]);

  return (
    <TripSelectionScreen
      currentStep={2}
      totalStep={6}
      title="Select City"
      subtitle="Choose a city to start building your trip"
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
