import AsyncStorage from "@react-native-async-storage/async-storage";
import { TripDraft, CityBlock } from "@/types/type";

/**
 * Storage keys
 * - TRIP_KEY: array of TripDraft items (with city dates persisted as ISO strings)
 * - FAV_KEY: string[] of trip IDs that are favorited
 * - VIEW_KEY: { [tripId]: ISOString } last viewed timestamps
 */
const TRIP_KEY = "trips";
const FAV_KEY = "@wm/favorites";
const VIEW_KEY = "@wm/viewed";

/* -----------------------------------------
   Persisted shapes (JSON) and converters
   ----------------------------------------- */

export type CityBlockPersisted = Omit<CityBlock, "startDate" | "endDate"> & {
  startDate: string; // ISO
  endDate: string; // ISO
};

export type TripPersisted = Omit<TripDraft, "cities"> & {
  cities: CityBlockPersisted[];
};

// Date <-> ISO for city blocks
export const cityToPersisted = (c: CityBlock): CityBlockPersisted => ({
  ...c,
  startDate: c.startDate.toISOString(),
  endDate: c.endDate.toISOString(),
});

export const cityFromPersisted = (c: CityBlockPersisted): CityBlock => ({
  ...c,
  startDate: new Date(c.startDate),
  endDate: new Date(c.endDate),
});

// Trip converters (cities only; trip-level fields already strings)
const tripToPersisted = (t: TripDraft): TripPersisted => ({
  ...(t as any),
  cities: (t.cities || []).map(cityToPersisted),
});

const tripFromPersisted = (t: TripPersisted): TripDraft => ({
  ...(t as any),
  cities: (t.cities || []).map(cityFromPersisted),
});

/* -----------------------
   CRUD: Trips (public)
   ----------------------- */

export const addTrip = async (newTrip: TripDraft) => {
  const trips = (await getTrips()) || [];
  trips.push(newTrip);
  await storeTrips(trips);
};

export const getTrips = async (): Promise<TripDraft[]> => {
  try {
    const json = await AsyncStorage.getItem(TRIP_KEY);
    if (!json) return [];
    const raw = JSON.parse(json) as TripPersisted[];
    return raw.map(tripFromPersisted);
  } catch (error) {
    console.log("❌ Get Trips Error:", error);
    return [];
  }
};

export const updateTrip = async (
  tripId: string,
  updatedFields: Partial<TripDraft>,
) => {
  const trips = (await getTrips()) || [];
  const updatedTrips = trips.map((trip) =>
    trip.id === tripId
      ? {
          ...trip,
          ...updatedFields,
          updatedAt: new Date().toISOString(),
        }
      : trip,
  );
  await storeTrips(updatedTrips);
};

export const deleteTrip = async (tripId: string) => {
  const trips = (await getTrips()) || [];
  const updatedTrips = trips.filter((trip) => trip.id !== tripId);
  await storeTrips(updatedTrips);

  // clean up metadata
  const favs = await getFavSet();
  if (favs.delete(tripId)) await saveFavSet(favs);
  const viewed = await getViewedMap();
  if (viewed[tripId]) {
    delete viewed[tripId];
    await saveViewedMap(viewed);
  }
};

export const removeAllTrips = async () => {
  try {
    await AsyncStorage.multiRemove([TRIP_KEY, FAV_KEY, VIEW_KEY]);
    console.log("🗑️ All trips + metadata removed from storage");
  } catch (error) {
    console.log("❌ Remove All Trips Error:", error);
  }
};

export const getTripById = async (
  tripId: string,
): Promise<TripDraft | null> => {
  const trips = await getTrips();
  return trips.find((trip) => trip.id === tripId) || null;
};

/* -----------------------
   Internal: persist layer
   ----------------------- */

const storeTrips = async (trips: TripDraft[]) => {
  try {
    const persisted: TripPersisted[] = trips.map(tripToPersisted);
    const json = JSON.stringify(persisted);
    await AsyncStorage.setItem(TRIP_KEY, json);
    console.log("✅ Trips stored successfully");
  } catch (error) {
    console.log("❌ Store Trips Error:", error);
  }
};

/* -------------------------------------------
   Metadata: Favorites & Last Viewed
   ------------------------------------------- */

const getFavSet = async (): Promise<Set<string>> => {
  const raw = await AsyncStorage.getItem(FAV_KEY);
  return new Set(raw ? (JSON.parse(raw) as string[]) : []);
};
const saveFavSet = async (s: Set<string>) =>
  AsyncStorage.setItem(FAV_KEY, JSON.stringify([...s]));

const getViewedMap = async (): Promise<Record<string, string>> => {
  const raw = await AsyncStorage.getItem(VIEW_KEY);
  return raw ? (JSON.parse(raw) as Record<string, string>) : {};
};
const saveViewedMap = async (m: Record<string, string>) =>
  AsyncStorage.setItem(VIEW_KEY, JSON.stringify(m));

/** Toggle favorite for a trip; returns the new favorite state */
export const toggleFavorite = async (id: string): Promise<boolean> => {
  const favs = await getFavSet();
  favs.has(id) ? favs.delete(id) : favs.add(id);
  await saveFavSet(favs);
  return favs.has(id);
};

/** Mark a trip as viewed; returns the timestamp used (ISO string) */
export const markViewed = async (id: string): Promise<string> => {
  const map = await getViewedMap();
  const ts = new Date().toISOString();
  map[id] = ts;
  await saveViewedMap(map);
  return ts;
};

// ---- REMOVE A CITY FROM A SAVED TRIP ----
export const removeCityFromTrip = async (
  tripId: string,
  cityId: string,
): Promise<boolean> => {
  const trip = await getTripById(tripId);
  if (!trip) return false;

  const nextCities = (trip.cities || []).filter(
    (c: any) => c.cityId !== cityId,
  );

  // Recompute overall range if there are cities left
  const updates: Partial<TripDraft> = {
    cities: nextCities as any,
    updatedAt: new Date().toISOString(),
  };

  if (nextCities.length > 0) {
    const toDate = (d: string | Date) => (d instanceof Date ? d : new Date(d));
    const starts = nextCities.map((c: any) => toDate(c.startDate).getTime());
    const ends = nextCities.map((c: any) => toDate(c.endDate).getTime());
    updates.startDate = new Date(Math.min(...starts)).toISOString();
    updates.endDate = new Date(Math.max(...ends)).toISOString();
  } else {
    // No cities left — you can keep previous range or clear it.
    // Here we keep previous trip.startDate/endDate as-is.
  }

  await updateTrip(tripId, updates);
  return true;
};
