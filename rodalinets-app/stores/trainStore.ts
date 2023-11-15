import { create } from "zustand";
import { Station } from "../types";

export type useStationStoreState = {
    stations: Array<Station>;
    departureStation: Station;
    destinationStation: Station;

    fetchStations: () => Promise<void>;
};

export const useStationStore = create((set) => ({
    departureStation: null,
    destinationStation: null,


    fetchStations: async () => {
        const res = await fetch("https://rodalinets.upf.edu/station/");
        let { stations } = await res.json();
        stations = stations.sort((a, b) => a.index - b.index)
        set({stations})
    },
    setDepartureStation: (station: Station) =>
        set({ departureStation: station }),
    setDestinationStation: (station: Station) =>
        set({ destinationStation: station }),
}));

