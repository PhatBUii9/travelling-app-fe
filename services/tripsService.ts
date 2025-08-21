// src/services/tripsService.ts
//
// Single data access point for trips.
// Today: delegates to AsyncStorage utils (tripStorage)
// Tomorrow: swap these implementations to hit your backend API.

import {
  addTrip as storageAddTrip,
  getTrips as storageGetTrips,
  getTripById as storageGetTripById,
  updateTrip as storageUpdateTrip,
  deleteTrip as storageDeleteTrip,
  removeAllTrips as storageRemoveAll,
  toggleFavorite as storageToggleFavorite,
  isFavorite as storageIsFavorite,
  getFavoriteTrips as storageGetFavoriteTrips,
  getRecentlyViewedTrips as storageGetRecentlyViewedTrips,
  markViewed as storageMarkViewed,
} from "@/utils/tripStorage";
import { TripDraft, TripWithMetadata } from "@/types/type";

/** Core CRUD */
async function list(): Promise<TripDraft[]> {
  return storageGetTrips();
}
async function get(id: string): Promise<TripDraft | null> {
  return storageGetTripById(id);
}
async function create(draft: TripDraft): Promise<void> {
  await storageAddTrip(draft);
}
async function patch(id: string, updates: Partial<TripDraft>): Promise<void> {
  await storageUpdateTrip(id, updates);
}
async function remove(id: string): Promise<void> {
  await storageDeleteTrip(id);
}
async function removeAll(): Promise<void> {
  await storageRemoveAll();
}

/** Favorites */
async function toggleFavorite(id: string): Promise<boolean> {
  return storageToggleFavorite(id);
}
async function isFavorite(id: string): Promise<boolean> {
  return storageIsFavorite(id);
}
async function favorites(limit = 5): Promise<TripDraft[]> {
  const trips = await storageGetFavoriteTrips();
  return limit ? trips.slice(0, limit) : trips;
}

/** Recently viewed */
async function markViewed(id: string): Promise<string> {
  return storageMarkViewed(id);
}
async function recentlyViewed(limit = 5): Promise<TripDraft[]> {
  return storageGetRecentlyViewedTrips(limit);
}

/** Convenience: merge per-trip metadata flags (favorite) */
async function listWithMetadata(): Promise<TripWithMetadata[]> {
  const trips = await list();
  const results: TripWithMetadata[] = [];
  for (const t of trips) {
    const fav = await isFavorite(t.id);
    results.push({ ...t, isFavorite: fav });
  }
  return results;
}

export const tripsService = {
  // CRUD
  list,
  listWithMetadata,
  get,
  create,
  patch,
  remove,
  removeAll,
  // Favorites
  toggleFavorite,
  isFavorite,
  favorites,
  // Recently viewed
  markViewed,
  recentlyViewed,
};
