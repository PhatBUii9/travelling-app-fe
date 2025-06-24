import { useContext } from "react";
import TripPlannerContext from "@/contexts/TripPlannerContext";

export const useTripPlanner = () => {
  const context = useContext(TripPlannerContext);
  if (!context) {
    throw new Error("useTripPlanner must be used within a TripPlannerProvider");
  }
  return context;
};
