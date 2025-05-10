import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="check-user" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
