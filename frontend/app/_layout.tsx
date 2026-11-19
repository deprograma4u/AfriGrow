import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ErrorBoundary } from "./error-boundary";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useTheme } from "@/components/ThemeProvider";
import { StatusBar } from "expo-status-bar";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <RootLayoutNav />
      </ErrorBoundary>
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  const theme = useTheme();
  return (
    <>
      <StatusBar style={theme.isDark ? "light" : "dark"} />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false}} />
        <Stack.Screen name="welcome" options={{ headerShown: false}} />
        <Stack.Screen name="setup" options={{ headerShown: false}} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </>
  );
}

