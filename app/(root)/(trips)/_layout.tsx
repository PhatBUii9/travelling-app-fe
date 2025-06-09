import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="shared" options={{ headerShown: false }} />
      <Stack.Screen name="suggested" options={{ headerShown: false }} />
      <Stack.Screen name="upcoming" options={{ headerShown: false }} />
      <Stack.Screen name="[tripId]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
