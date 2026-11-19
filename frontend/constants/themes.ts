// Theme definitions for light and dark modes
import Colors from './colors';

export type ThemeType = 'light' | 'dark';

export interface Theme {
  background: string;
  cardBackground: string;
  text: string;
  textLight: string;
  border: string;
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  iconLight: string;
  weatherBlue: string;
  soilBrown: string;
  isDark: boolean
}

export const lightTheme: Theme = {
  background: Colors.background,
  cardBackground: Colors.cardBackground,
  text: Colors.text,
  textLight: Colors.textLight,
  border: Colors.border,
  primary: Colors.primary,
  secondary: Colors.secondary,
  accent: Colors.accent,
  success: Colors.success,
  warning: Colors.warning,
  error: Colors.error,
  info: Colors.info,
  iconLight: Colors.iconLight,
  weatherBlue: Colors.weatherBlue,
  soilBrown: Colors.soilBrown,
  isDark: false
};

export const darkTheme: Theme = {
  background: '#121212',
  cardBackground: '#1E1E1E',
  text: '#ECEFF1',
  textLight: '#B0BEC5',
  border: '#333333',
  primary: '#4CAF50', // Slightly brighter green for dark mode
  secondary: '#8BC3A4',
  accent: '#FFB74D', // Slightly brighter amber for dark mode
  success: '#66866A',
  warning: '#FFA72E',
  error: '#FF5350',
  info: '#42A5F5',
  iconLight: '#78909C',
  weatherBlue: '#6485F6',
  soilBrown: '#41887F',
  isDark: true
};