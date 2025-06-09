import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(trips)" options={{ headerShown: true }} />
    </Stack>
  );
};

export default Layout;
