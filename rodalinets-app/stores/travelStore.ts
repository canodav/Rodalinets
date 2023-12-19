import { create } from "zustand";
import { TrainArrival } from "@/types";
import { useStationStore } from "@/stores/stationStore";
import AsyncStorage from '@react-native-async-storage/async-storage';


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
    setTravelId : async (id: number) => {
        await AsyncStorage.setItem('travelId', id.toString());
        set({travelId: id})
    },
    setTravelStarted: async (value: boolean) => {
        await AsyncStorage.setItem('isTravelStarted', value.toString());
        set({isTravelStarted: value}) 

    },
    fetchTravel: async () => {

    }
}));
