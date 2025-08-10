import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getTrips,
  addTrip,
  updateTrip as updateTripStorage,
  deleteTrip as deleteTripStorage,
  toggleFavorite as toggleFavoriteStorage,
  markViewed as markViewedStorage,
} from "@/utils/tripStorage";
import { TripDraft } from "@/types/type";

// keep these in sync with tripStorage.tsx
const FAV_KEY = "@wm/favorites";
const VIEW_KEY = "@wm/viewed";

export interface TripWithMetadata extends TripDraft {
  isFavorite?: boolean;
  viewedAt?: string;
  lastViewed?: string; // optional: not used now
}

interface UseTripsReturn {
  trips: TripWithMetadata[];
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  loadTrips: () => Promise<void>;
  refreshTrips: () => Promise<void>;
  createTrip: (draft: TripDraft) => Promise<TripDraft | null>;
  updateTrip: (
    id: string,
    updates: Partial<TripDraft>,
  ) => Promise<TripDraft | null>;
  deleteTrip: (id: string) => Promise<boolean>;
  toggleFavorite: (id: string) => Promise<boolean>;
  markViewed: (id: string) => Promise<void>;
  clearError: () => void;
}

const mergeMetadata = async (
  base: TripDraft[],
): Promise<TripWithMetadata[]> => {
  const favRaw = await AsyncStorage.getItem(FAV_KEY);
  const favs = new Set(favRaw ? (JSON.parse(favRaw) as string[]) : []);
  const viewedRaw = await AsyncStorage.getItem(VIEW_KEY);
  const viewed = viewedRaw
    ? (JSON.parse(viewedRaw) as Record<string, string>)
    : {};
  return base.map((t) => ({
    ...t,
    isFavorite: favs.has(t.id),
    viewedAt: viewed[t.id],
  }));
};

export const useTrips = (): UseTripsReturn => {
  const [trips, setTrips] = useState<TripWithMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTrips = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      const loaded = await getTrips();
      setTrips(await mergeMetadata(loaded));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load trips";
      setError(errorMessage);
      console.error("Error loading trips:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshTrips = useCallback(async () => {
    try {
      setError(null);
      setIsRefreshing(true);
      const loaded = await getTrips();
      setTrips(await mergeMetadata(loaded));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to refresh trips";
      setError(errorMessage);
      console.error("Error refreshing trips:", err);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  const createTrip = useCallback(
    async (draft: TripDraft): Promise<TripDraft | null> => {
      try {
        setError(null);
        await addTrip(draft);
        await refreshTrips();
        return draft;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create trip";
        setError(errorMessage);
        console.error("Error creating trip:", err);
        return null;
      }
    },
    [refreshTrips],
  );

  const updateTrip = useCallback(
    async (
      id: string,
      updates: Partial<TripDraft>,
    ): Promise<TripDraft | null> => {
      try {
        setError(null);
        await updateTripStorage(id, updates);
        await refreshTrips();
        return { id, ...updates } as TripDraft;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update trip";
        setError(errorMessage);
        console.error("Error updating trip:", err);
        return null;
      }
    },
    [refreshTrips],
  );

  const deleteTrip = useCallback(async (id: string): Promise<boolean> => {
    try {
      setError(null);
      await deleteTripStorage(id);
      setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== id));
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete trip";
      setError(errorMessage);
      console.error("Error deleting trip:", err);
      return false;
    }
  }, []);

  const toggleFavorite = useCallback(async (id: string): Promise<boolean> => {
    const nowFav = await toggleFavoriteStorage(id);
    setTrips((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isFavorite: nowFav } : t)),
    );
    return nowFav;
  }, []);

  const markViewed = useCallback(async (id: string): Promise<void> => {
    const ts = await markViewedStorage(id);
    setTrips((prev) =>
      prev.map((t) => (t.id === id ? { ...t, viewedAt: ts } : t)),
    );
  }, []);

  const clearError = useCallback(() => setError(null), []);

  useEffect(() => {
    loadTrips();
  }, [loadTrips]);

  return {
    trips,
    isLoading,
    isRefreshing,
    error,
    loadTrips,
    refreshTrips,
    createTrip,
    updateTrip,
    deleteTrip,
    toggleFavorite,
    markViewed,
    clearError,
  };
};
