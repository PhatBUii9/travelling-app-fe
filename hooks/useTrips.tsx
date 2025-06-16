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
  const [isEmpty, setIsEmpty] = useState(true);

  const checkEmpty = (fn: Array<Trip>) => {
    if (fn.length > 0) {
      setData(fn);
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
      setData([]);
    }
  };

  const refetch = useCallback(() => {
    setIsLoading(true);
    if (simulateError) {
      setData([]);
      setIsEmpty(true);
      setIsError(true);
      setIsLoading(false);
      return;
    }
    try {
      switch (filter) {
        case "upcoming":
          checkEmpty(mockTrips.filter((i) => i.status === "upcoming"));
          break;
        case "shared":
          checkEmpty(mockTrips.filter((i) => i.shared === true));
          break;
        default:
          checkEmpty(mockTrips);
      }
    } catch (error) {
      console.log(`Trip fetching error: ${error}`);
      setIsError(true);
      setData([]);
      setIsEmpty(true);
    } finally {
      setIsLoading(false);
    }
  }, [filter, simulateError]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, isLoading, isError, isEmpty, refetch };
}
export default useTrips;
