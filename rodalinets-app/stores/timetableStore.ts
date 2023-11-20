import { create } from "zustand";
import { TrainArrival } from "@/types";
import { useStationStore } from "@/stores/stationStore";

export type useTimetableStoreState = {
    timetable: Array<TrainArrival>;
    lastTimeUpdate: string;
    setLastUpdateTime: (date: string) => void;
    fetchTimetable: () => Promise<void>;
};

const setLastUpdateTime = (set: any) => (date: string) => {
    set({ lastTimeUpdate: date });
};


export const useTimetableStore = create<useTimetableStoreState>((set, get) => ({
    timetable: [],
    lastTimeUpdate: "",

    fetchTimetable: async () => {
        try {
            const { departureStation, destinationStation } = useStationStore.getState();
            if(departureStation && destinationStation){
                const currentTime = new Date().valueOf();
                const response = await fetch(`https://rodalinets.upf.edu/train?fromStationId=${departureStation.id}&toStationId=${destinationStation.id}&currentTime=${currentTime}&limit=3`)
                const { trains } = await response.json();
                set({timetable : trains});
                get().setLastUpdateTime(new Date().toLocaleString());
            }
        } catch (error) {
            console.error('Failed to fetch timetables:', error);
        }
    },

    setLastUpdateTime: setLastUpdateTime(set)
}));
