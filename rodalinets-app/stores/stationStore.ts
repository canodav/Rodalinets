import { create } from "zustand";
import { Station, nearestStation } from "../types";
import { useUserStore } from "@/stores/userStore";
import AsyncStorage from '@react-native-async-storage/async-storage';


export type useStationStoreState = {
    stations: Array<Station>;
    departureStation: Station | null;
    destinationStation: Station | null;
    nearestStation: nearestStation | null;

    fetchStations: () => Promise<void>;
    fetchNearestStation: (latitude:number, longitude:number) => Promise<void>;
    setDepartureStation: (station: Station) => void,
    setDestinationStation: (station: Station) => void,
    loadLastTravel: () => Promise<void>

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
    setDepartureStation: async (station: Station) =>{
        await AsyncStorage.setItem('lastDepartureStation', JSON.stringify(station));
        set({ departureStation: station })
    },
    setDestinationStation: async (station: Station) => {
        await AsyncStorage.setItem('lastDestinationStation', JSON.stringify(station));
        set({ destinationStation: station })
    },
    fetchNearestStation: async (latitude, longitude) => {
        const res = await fetch(`https://rodalinets.upf.edu/station/nearest?latitude=${latitude}&longitude=${longitude}`);
        let { station } = await res.json();
        set({nearestStation: station})
    },
    loadLastTravel: async () => {
        const lastDepartureStation = await AsyncStorage.getItem('lastDepartureStation');
        const lastDestinationStation = await AsyncStorage.getItem('lastDestinationStation');

        if (lastDepartureStation) set({ departureStation: JSON.parse(lastDepartureStation) });
        if (lastDestinationStation) set({ destinationStation: JSON.parse(lastDestinationStation) });
    },
    
}));

