import HeaderLeft from "@/components/layout/HeaderLeft";
import { TripPlannerProvider } from "@/contexts/TripPlannerContext";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <TripPlannerProvider>
      <Stack
        screenOptions={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerLeft: HeaderLeft,
        }}
      >
        <Stack.Screen name="index" options={{ title: "" }} />
        <Stack.Screen name="select-city" options={{ title: "" }} />
        <Stack.Screen name="select-dates" options={{ title: "" }} />
        <Stack.Screen name="select-places" options={{ title: "" }} />
        <Stack.Screen name="select-restaurants" options={{ title: "" }} />
        <Stack.Screen name="select-accommodation" options={{ title: "" }} />
        <Stack.Screen name="trip-preview" options={{ title: "" }} />
      </Stack>
    </TripPlannerProvider>
  );
};

export default Layout;
