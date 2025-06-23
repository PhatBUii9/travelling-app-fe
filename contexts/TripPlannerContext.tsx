import { CityBlock, TripPlannerContextType } from "@/types/type";
import React, { createContext, useState, useContext } from "react";

const TripPlannerContext = createContext<TripPlannerContextType | undefined>(
  undefined
);

export const TripPlannerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tripTitle, setTripTitle] = useState("");
  const [cities, setCities] = useState<CityBlock[]>([]);

  const addCity = (city: CityBlock) => {
    setCities((prev) => [...prev, city]);
  };

  const updateCity = (cityId: string, updated: Partial<CityBlock>) => {
    setCities((prev) =>
      prev.map((city) =>
        city.cityId === cityId ? { ...city, ...updated } : city
      )
    );
  };

  const removeCity = (cityId: string) => {
    setCities((prev) => prev.filter((c) => c.cityId !== cityId));
  };

  const resetTrip = () => {
    setTripTitle("");
    setCities([]);
  };

  return (
    <TripPlannerContext.Provider
      value={{
        tripTitle,
        cities,
        setTripTitle,
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
