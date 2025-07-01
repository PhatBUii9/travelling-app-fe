import { CityBlock, TripPlannerContextType } from "@/types/type";
import React, { createContext, useState } from "react";

const TripPlannerContext = createContext<TripPlannerContextType | undefined>(
  undefined,
);

export const TripPlannerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tripTitle, setTripTitle] = useState<string>("");
  const [cities, setCities] = useState<CityBlock[]>([]);
  const [currentCityId, setCurrentCityId] = useState<string | null>(null);

  const addCity = (city: CityBlock) => {
    setCities((prev) => [...prev, city]);
  };

  const updateCity = (cityId: string, updated: Partial<CityBlock>) => {
    setCities((prev) =>
      prev.map((city) =>
        city.cityId === cityId ? { ...city, ...updated } : city,
      ),
    );
  };

  const removeCity = (cityId: string) => {
    setCities((prev) => prev.filter((c) => c.cityId !== cityId));
  };

  const resetTrip = () => {
    setTripTitle("");
    setCities([]);
    setCurrentCityId(null);
  };

  const setCurrentCity = (cityId: string) => {
    setCurrentCityId(cityId);
  };

  return (
    <TripPlannerContext.Provider
      value={{
        tripTitle,
        cities,
        currentCityId,
        setTripTitle,
        setCurrentCity,
        addCity,
        updateCity,
        removeCity,
        resetTrip,
      }}
    >
      {children}
    </TripPlannerContext.Provider>
  );
};

export default TripPlannerContext;
