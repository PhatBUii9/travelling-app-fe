import HeaderLeft from "@/components/layout/HeaderLeft";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

const Layout = () => {
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
      <Stack.Screen name="review" options={{ title: "Trip Review" }} />
      <Stack.Screen name="plan-trip" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
