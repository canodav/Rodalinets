import { create } from "zustand";
import AsyncStorage from '@react-native-async-storage/async-storage';

export type useTravelStoreState = {
    isTravelStarted: boolean;
    travelId: number | null;
    
    setTravelStarted: (value: boolean) => void,
    setTravelId: (id: number) => void,
    startTravel: (departureStation: any, destinationStation: any, userId: string) => Promise<void>,
    endTravel: () => Promise<void>,
};

export const useTravelStore = create<useTravelStoreState>((set, get) => ({
    isTravelStarted: false,
    travelId: null,
    setTravelId: async (id: number) => {
        await AsyncStorage.setItem('travelId', id.toString());
        set({ travelId: id });
    },
    setTravelStarted: async (value: boolean) => {
        await AsyncStorage.setItem('isTravelStarted', value.toString());
        set({ isTravelStarted: value });
    },
    startTravel: async (departureStation, destinationStation, userId) => {

        if (get().isTravelStarted || !departureStation || !destinationStation) {
            return;
        }

        const response = await fetch(`https://rodalinets.upf.edu/travel?fromStation=${departureStation.name}&toStation=${destinationStation.name}&userId=${userId}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            const data = await response.json();
            get().setTravelId(data.id);
            get().setTravelStarted(true);
            setTimeout(() => {
                get().endTravel();
            }, 20 * 60 * 1000);
        } else {
            throw new Error(`Request failed with status: ${response.status}`);
        }
    },
    endTravel: async () => {
        const travelId = get().travelId;
        if (!travelId) return;
        
        const response = await fetch('https://rodalinets.upf.edu/travel/' + travelId, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                endTime: new Date(),
            }),
        });
        if (response.status === 200) {
            get().setTravelStarted(false);
        } else {
            throw new Error(`Request failed with status: ${response.status}`);
        }
    },
}));
