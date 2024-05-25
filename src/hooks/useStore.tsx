import { create } from 'zustand';
import Settings from '../models/Settings';
import { produce } from 'immer';

interface AllState {
  assets: any;
  data: any;
  gameState: any;
  settings: Settings;
  isLoaded: boolean;
  setAssets: (assets: any) => void;
  setData: (data: any) => void;
  setGameState: (gameState: any) => void;
  setSettings: (settings: Settings) => void;
  setIsLoaded: (isLoaded: boolean) => void;
  updateState: (path: any, value: any) => void;
}

const useStore = create<AllState>((set) => ({
  assets: {},
  data: null,
  gameState: null,
  settings: null,
  isLoaded: false,
  setAssets: (assets) => set({ assets }),
  setData: (data) => set({ data }),
  setGameState: (gameState) => set({ gameState }),
  setSettings: (settings) => set((s) => ({ ...s, settings })),
  setIsLoaded: (isLoaded) => set({ isLoaded }),
  updateState: (path, value) =>
    set(
      produce((state) => {
        const keys = path.split('.');
        let obj = state;
        while (keys.length > 1) {
          obj = obj[keys.shift()];
        }
        obj[keys[0]] = value;
      }),
    ),
}));

export default useStore;
