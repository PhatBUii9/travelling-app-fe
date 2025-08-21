import { create } from "zustand";
import {
  getFavoriteTrips,
  isFavorite,
  toggleFavorite,
} from "@/utils/tripStorage";
import { TripDraft } from "@/types/type";

type FavState = {
  favIds: Record<string, boolean>;
  loading: boolean;

  /** Pull current favorites from storage and build the id → bool map */
  hydrate: () => Promise<void>;

  /** Optimistic flip + persist; reverts on failure */
  toggle: (id: string) => Promise<void>;

  /** Seed/refresh flags from any list of trips you already have in memory */
  updateFromTrips: (trips: TripDraft[]) => void;

  /** Helper to read a single id (optional) */
  isFav: (id: string) => boolean;
};

export const useFavoritesStore = create<FavState>((set, get) => ({
  favIds: {},
  loading: false,

  hydrate: async () => {
    set({ loading: true });
    try {
      const favTrips = await getFavoriteTrips();
      const map: Record<string, boolean> = {};
      for (const t of favTrips) map[t.id] = true;
      set({ favIds: map, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  toggle: async (id: string) => {
    // optimistic
    set((s) => ({ favIds: { ...s.favIds, [id]: !s.favIds[id] } }));
    try {
      await toggleFavorite(id); // persist to AsyncStorage
      // re-hydrate to keep canonical truth (and section lists accurate)
      await get().hydrate();
    } catch {
      // revert
      set((s) => ({ favIds: { ...s.favIds, [id]: !s.favIds[id] } }));
    }
  },

  updateFromTrips: (trips: TripDraft[]) => {
    // Preserve known favorites, fill in unknowns from trips[].isFavorite-like hints
    set((s) => {
      const next = { ...s.favIds };
      for (const t of trips) {
        if (next[t.id] === undefined) {
          next[t.id] = false;
        }
      }
      return { favIds: next };
    });
  },

  isFav: (id: string) => !!get().favIds[id],
}));
