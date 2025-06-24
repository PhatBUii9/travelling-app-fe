import HeaderLeft from "@/components/layout/HeaderLeft";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

const Layout = () => {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerLeft: HeaderLeft,
        headerTintColor: "#000",
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {}}
            style={{ paddingHorizontal: 16 }}
          >
            <Ionicons name="options" size={24} color="#000" />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="suggested" options={{ title: "Suggested Trips" }} />
      <Stack.Screen name="upcoming" options={{ title: "Upcoming Trips" }} />
      <Stack.Screen name="shared" options={{ title: "Shared with Me" }} />
      <Stack.Screen name="create" options={{ title: "Plan a Trip" }} />
      <Stack.Screen name="preview" options={{ title: "Trip Preview" }} />
      <Stack.Screen name="plan-trip" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
