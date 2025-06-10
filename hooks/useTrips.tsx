import { mockTrips } from "@/data/mockTrip";
import { Trip, UseTripsOptions, UseTripsResult } from "@/types/type";
import { useState, useEffect, useCallback } from "react";

function useTrips({
  filter,
  simulateError = false,
}: UseTripsOptions): UseTripsResult {
  const [data, setData] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const refetch = useCallback(() => {
    setIsLoading(true);
    simulateError ? setIsError(true) : setIsError(false);
    try {
      switch (filter) {
        case "upcoming":
          setData(mockTrips.filter((i) => i.status === "upcoming"));
          break;
        case "shared":
          setData(mockTrips.filter((i) => i.shared === true));
          break;
        default:
          setData(mockTrips);
          break;
      }
    } catch (error) {
      console.log(`Trip fetching error: ${error}`);
      setIsError(true);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, isLoading, isError, refetch };
}
export default useTrips;
