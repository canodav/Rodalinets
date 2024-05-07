import { create } from 'zustand';
 

export type useLocaleStoreState = {
  locale: string,
  setLocale : (locale: string) => void
};

const useLocaleStore = create<useLocaleStoreState>(set => ({
  locale: 'ca',
  setLocale: (locale) => set({ locale })
}));

export default useLocaleStore;
