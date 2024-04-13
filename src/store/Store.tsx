import { create } from "zustand";

interface ThemeState {
  mode: string;
  changeMode: (value: string) => void;
}

const useThemeStore = create<ThemeState>()((set) => ({
  mode: "light",
  changeMode: (value: string) => set(() => ({ mode: value })),
}));

export default useThemeStore;
