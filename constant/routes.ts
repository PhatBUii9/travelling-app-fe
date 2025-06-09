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
      DASHBOARD: "/(root)/(tabs)/dashboard" as RelativePathString,
      CHAT: "/(root)/(tabs)/chat" as RelativePathString,
      PROFILE: "/(root)/(tabs)/profile" as RelativePathString,
    },
    TRIPS: {
      TRIP_DETAIL: "/(root)/(trips)/[tripId]" as RelativePathString,
      SHARED: "/(root)/(trips)/shared" as RelativePathString,
      SUGGESTED: "/(root)/(trips)/suggested" as RelativePathString,
      UPCOMING: "/(root)/(trips)/upcoming" as RelativePathString,
    },
  },
} as const;
