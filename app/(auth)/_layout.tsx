import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="otp-options" options={{ headerShown: false }} />
      <Stack.Screen name="email-otp" options={{ headerShown: false }} />
      <Stack.Screen name="sms-otp" options={{ headerShown: false }} />
      <Stack.Screen name="forget-password" options={{ headerShown: false }} />
      <Stack.Screen name="new-password" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
