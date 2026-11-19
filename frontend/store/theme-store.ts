import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeType, lightTheme, darkTheme } from '@/constants/themes';

interface ThemeState {
  themeMode: ThemeType | 'system';
  setThemeMode: (mode: ThemeType | 'system') => void;
  toggleTheme: () => void;
  getCurrentTheme: (colorScheme?: 'light' | 'dark' | null) => typeof lightTheme;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      themeMode: 'system',
      
      setThemeMode: (mode) => set({ themeMode: mode }),
      
      toggleTheme: () => {
        const currentMode = get().themeMode;
        const newMode = currentMode === 'light' ? 'dark' : 'light';
        set({ themeMode: currentMode === 'system' ? newMode : newMode });
      },
      
      getCurrentTheme: (colorScheme) => {
        const { themeMode } = get();
        if (themeMode === 'system') {
          return colorScheme === 'dark' ? darkTheme : lightTheme;
        }
        return themeMode === 'dark' ? darkTheme : lightTheme;
      },
    }),
    {
      name: 'farm-assistant-theme',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
