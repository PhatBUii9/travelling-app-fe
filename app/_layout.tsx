import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { RegistrationProvider } from "@/contexts/RegistrationContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-get-random-values";
import SheetsPortal from "@/components/layout/SheetsPortal";

// Prevent splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function AppStack() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  return (
    <Stack>
      {isAuthenticated ? (
        <Stack.Screen name="(root)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      )}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    Jakarta: require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <RegistrationProvider>
          <LoadingProvider>
            <AppStack />
            <SheetsPortal />
          </LoadingProvider>
        </RegistrationProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
