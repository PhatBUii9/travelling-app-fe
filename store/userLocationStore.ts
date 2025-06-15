import { create } from "zustand";

interface LocationState {
  userLat?: number;
  userLng?: number;
  destLat?: number;
  destLng?: number;
  setUserLocation: (lat: number, lng: number) => void;
  setDestination: (lat: number, lng: number) => void;
}

export const useUserLocationStore = create<LocationState>((set) => ({
  userLat: undefined,
  userLng: undefined,
  destLat: undefined,
  destLng: undefined,
  setUserLocation: (lat, lng) => set({ userLat: lat, userLng: lng }),
  setDestination: (lat, lng) => set({ destLat: lat, destLng: lng }),
}));
