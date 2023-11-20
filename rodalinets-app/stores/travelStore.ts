import { create } from "zustand";
import { TrainArrival } from "@/types";
import { useStationStore } from "@/stores/stationStore";

export type useTravelStoreState = {
   isTravelStarted : boolean;
   travelId: number | null;
   
   setTravelStarted: (value: boolean) => void,
   setTravelId: (id: number) => void,
   fetchTravel: () => void;
};


export const useTravelStore = create<useTravelStoreState>((set, get) => ({
    isTravelStarted :  false,
    travelId : null,
    setTravelId :  (id: number) => {
        set({travelId: id})
    },
    setTravelStarted: (value: boolean) => {
        set({isTravelStarted: value})
    },
    fetchTravel: async () => {

    }

}));
