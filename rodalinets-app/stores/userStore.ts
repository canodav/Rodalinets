import { create } from "zustand";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

export type useUserStoreState = {
    userId: string | null,
    currentLocation : Location | null,
    generateAndStoreUserId : () => Promise<void>,
    setCurrentLocation: (location: Location) => void
    
};


export const useUserStore = create<useUserStoreState>((set, get) => ({
    userId: null,
    currentLocation: null,
    generateAndStoreUserId: async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            if (!userId) {
                const newUserId = Crypto.randomUUID()
                await AsyncStorage.setItem('userId', newUserId);
                set({ userId: newUserId });
            } else {
                set({ userId });
            }
        } catch (error) {
            console.error('Error while generating or storing user ID:', error);
        }
    },
    setCurrentLocation: (location: Location) => {
        set({currentLocation: location})
    }

}));
