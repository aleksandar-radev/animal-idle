import { create } from 'zustand';
import Settings from '@/models/Settings';
import { produce } from 'immer';
import Data from '@/models/Data';
import FightState from '@/models/FightState';

interface AllState {
  assets: any;
  data: Data;
  fightState: FightState;
  settings: Settings;
  isLoaded: boolean;
  setAssets: (assets: any) => void;
  setData: (data: any) => void;
  setfightState: (fightState: any) => void;
  setSettings: (settings: Settings) => void;
  setIsLoaded: (isLoaded: boolean) => void;
  updateState: (path: any, value: any) => void;
}

const useStore = create<AllState>((set) => ({
  assets: {},
  data: null,
  fightState: null,
  settings: null,
  isLoaded: false,
  setAssets: (assets) => set({ assets }),
  setData: (data) => set({ data }),
  setfightState: (fightState) => set({ fightState }),
  setSettings: (settings) => set((s) => ({ ...s, settings })),
  setIsLoaded: (isLoaded) => set({ isLoaded }),
  updateState: (path, value) => {
    set(
      produce((state) => {
        const keys = path.split('.');
        let obj = state;
        while (keys.length > 1) {
          const key = keys.shift();
          if (!obj[key]) {
            obj[key] = {}; // Ensure the key exists in the state
          }
          obj = obj[key];
        }
        obj[keys[0]] = value;
      }),
    );
  },
}));

export default useStore;
