import { Tabs } from "expo-router";
import { View, Image, Text, ImageSourcePropType } from "react-native";
import { icons } from "@/constant";

type TabIconProps = {
  source: ImageSourcePropType;
  focused: boolean;
  label: string;
};

const TabIcon = ({ source, focused, label }: TabIconProps) => {
  return (
    <View className="items-center justify-center h-full w-20">
      <Image
        source={source}
        className="w-6 h-6"
        style={{
          tintColor: focused ? "#00C851" : "#A0A0A0",
        }}
      />
      <Text
        className={`text-xs mt-1 ${focused ? "text-black" : "text-gray-400"}`}
        //numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
};

const Layout = () => {
  return (
    <Tabs
      initialRouteName="dashboard"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 70,
          backgroundColor: "#fff",
          paddingTop: 10,
          paddingBottom: 10,
          borderTopWidth: 0,
          elevation: 8,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon source={icons.home} focused={focused} label="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="trip"
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon source={icons.chat} focused={focused} label="Trips" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon source={icons.profile} focused={focused} label="Profile" />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
