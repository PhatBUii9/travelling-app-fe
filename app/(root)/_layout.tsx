import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="trip-detail"
        options={{
          title: "Trip Detail",
          headerTitleAlign: "center",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
    </Stack>
  );
};

export default Layout;
