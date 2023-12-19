import { create } from "zustand";
import { Station, nearestStation } from "../types";
import { useUserStore } from "@/stores/userStore";

export type useStationStoreState = {
    stations: Array<Station>;
    departureStation: Station | null;
    destinationStation: Station | null;
    nearestStation: nearestStation | null;

    fetchStations: () => Promise<void>;
    fetchNearestStation: (latitude:number, longitude:number) => Promise<void>;
    setDepartureStation: (station: Station) => void,
    setDestinationStation: (station: Station) => void

};

export const useStationStore = create<useStationStoreState>((set) => ({
    stations: [],
    departureStation: null,
    destinationStation: null,
    nearestStation: null,


    fetchStations: async () => {
        const res = await fetch("https://rodalinets.upf.edu/station/");
        let { stations } = await res.json();
        stations = stations.sort((a : Station, b : Station) => a.index - b.index)
        set({stations})
    },
    setDepartureStation: (station: Station) =>
        set({ departureStation: station }),
    setDestinationStation: (station: Station) =>
        set({ destinationStation: station }),

    fetchNearestStation: async (latitude, longitude) => {
        const res = await fetch(`https://rodalinets.upf.edu/station/nearest?latitude=${latitude}&longitude=${longitude}`);
        let { station } = await res.json();
        set({nearestStation: station})
    }
    
}));

