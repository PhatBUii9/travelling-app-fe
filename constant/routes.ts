import { RelativePathString } from "expo-router";

export const ROUTES = {
  AUTH: {
    SIGN_IN: "/(auth)/sign-in" as const,
    SIGN_UP: "/(auth)/sign-up" as const,
    FORGOT_PASSWORD: "/(auth)/forget-password" as const,
    OTP_OPTIONS: "/(auth)/otp-options" as const,
    EMAIL_OTP: "(auth)/email-otp" as RelativePathString,
  },
  ROOT: {
    TABS: {
      HOME: "/(root)/(tabs)/home" as RelativePathString,
      CHAT: "/(root)/(tabs)/chat" as RelativePathString,
      PROFILE: "/(root)/(tabs)/profile" as RelativePathString,
    },
    TRIP_DETAIL: "/(root)/trip-detail" as RelativePathString,
  },
} as const;
