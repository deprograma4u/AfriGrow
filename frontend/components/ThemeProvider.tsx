import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';
import { useThemeStore } from '@/store/theme-store';
import { Theme, lightTheme, darkTheme } from '@/constants/themes';
import * as NavigationBar from 'expo-navigation-bar';

const ThemeContext = createContext<Theme>(lightTheme);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const colorScheme = useColorScheme();
  const { themeMode, getCurrentTheme } = useThemeStore();
  
  const theme = useMemo(() => {
    return getCurrentTheme(colorScheme || 'light');
  }, [themeMode, colorScheme, getCurrentTheme]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(theme.background);
      NavigationBar.setButtonStyleAsync(theme.isDark ? 'light' : 'dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <StatusBar
        backgroundColor={theme.background} // Add this to your theme
        barStyle={theme.isDark ? 'light-content' : 'dark-content'}
        translucent={false}
      />
      {children}
    </ThemeContext.Provider>
  );
}

