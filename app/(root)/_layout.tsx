import { Stack } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";

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
