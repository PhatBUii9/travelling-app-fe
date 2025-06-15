import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/";

const Layout = () => {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ paddingHorizontal: 16 }}
          >
            <Icon name="chevron-left" size={24} color="#000" />
          </TouchableOpacity>
        ),
        headerTintColor: "#000",
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {}}
            style={{ paddingHorizontal: 16 }}
          >
            <Icon name="navicon" size={24} color="#000" />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="suggested" options={{ title: "Suggested Trips" }} />
      <Stack.Screen name="upcoming" options={{ title: "Upcoming Trips" }} />
      <Stack.Screen name="shared" options={{ title: "Shared with Me" }} />
    </Stack>
  );
};

export default Layout;
