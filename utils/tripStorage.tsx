import AsyncStorage from "@react-native-async-storage/async-storage";
import { TripDraft } from "@/types/type";

/**
 * Storage keys
 * - TRIP_KEY: array of TripDraft items
 * - FAV_KEY: string[] of trip IDs that are favorited
 * - VIEW_KEY: { [tripId]: ISOString } last viewed timestamps
 */
const TRIP_KEY = "trips";
const FAV_KEY = "@wm/favorites";
const VIEW_KEY = "@wm/viewed";

// ---------- CRUD: Trips ----------
export const addTrip = async (newTrip: TripDraft) => {
  const trips = (await getTrips()) || [];
  trips.push(newTrip);
  await storeTrips(trips);
};

export const getTrips = async (): Promise<TripDraft[]> => {
  try {
    const json = await AsyncStorage.getItem(TRIP_KEY);
    return json ? (JSON.parse(json) as TripDraft[]) : [];
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
      ? { ...trip, ...updatedFields, updatedAt: new Date().toISOString() }
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

const storeTrips = async (trips: TripDraft[]) => {
  try {
    const json = JSON.stringify(trips);
    await AsyncStorage.setItem(TRIP_KEY, json);
    console.log("✅ Trips stored successfully");
  } catch (error) {
    console.log("❌ Store Trips Error:", error);
  }
};

// ---------- Metadata: Favorites & Viewed ----------
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

/** Mark a trip as viewed; returns the timestamp used */
export const markViewed = async (id: string): Promise<string> => {
  const map = await getViewedMap();
  const ts = new Date().toISOString();
  map[id] = ts;
  await saveViewedMap(map);
  return ts;
};
