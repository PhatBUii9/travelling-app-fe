import { icons } from "@/constant";
import { Tabs } from "expo-router";
import { View, Image, ImageSourcePropType } from "react-native";

const TabIcon = ({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => {
  return (
    <View className="items-center justify-center w-full h-full">
      <View
        className={`rounded-full p-3 items-center justify-center ${
          focused ? "bg-green-500" : ""
        }`}
      >
        <Image
          source={source}
          tintColor="white"
          resizeMode="contain"
          className="w-6 h-6"
        />
      </View>
    </View>
  );
};

const Layout = () => {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#333333",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 20,
          height: 70,
          paddingHorizontal: 30,
          position: "absolute",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          borderWidth: 1,
          borderColor: "#444",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon focused={focused} source={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon focused={focused} source={icons.chat} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon focused={focused} source={icons.profile} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
