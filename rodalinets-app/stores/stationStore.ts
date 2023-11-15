import { create } from "zustand";
import { Station } from "../types";

export type useStationStoreState = {
    stations: Array<Station>;
    departureStation: Station | null;
    destinationStation: Station | null;

    fetchStations: () => Promise<void>;
    setDepartureStation: (station: Station) => void,
    setDestinationStation: (station: Station) => void

};

export const useStationStore = create<useStationStoreState>((set) => ({
    stations: [],
    departureStation: null,
    destinationStation: null,


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
}));

