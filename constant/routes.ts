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
      TRIP: "/(root)/(tabs)/my-trip" as RelativePathString,
      PROFILE: "/(root)/(tabs)/profile" as RelativePathString,
    },
    TRIPS: {
      TRIP_DETAIL: "/(root)/(trips)/[id]" as RelativePathString, // <-- matches [id].tsx

      TRIP_CREATE: "/(root)/(trips)/create" as RelativePathString,
      TRIP_PREVIEW: "/(root)/(trips)/preview" as RelativePathString,
      SHARED: "/(root)/(trips)/shared" as RelativePathString,
      SUGGESTED: "/(root)/(trips)/suggested" as RelativePathString,
      UPCOMING: "/(root)/(trips)/upcoming" as RelativePathString,

      PLAN_TRIP: {
        WIZARD_START: "/(root)/(trips)/plan-trip/" as RelativePathString,
        SELECT_CITY:
          "/(root)/(trips)/plan-trip/select-city" as RelativePathString,
        SELECT_ACTIVITIES:
          "/(root)/(trips)/plan-trip/select-activities" as RelativePathString,
        SELECT_DATES:
          "/(root)/(trips)/plan-trip/select-dates" as RelativePathString,
        SELECT_RESTAURANTS:
          "/(root)/(trips)/plan-trip/select-restaurants" as RelativePathString,
        SELECT_ACCOMMODATION:
          "/(root)/(trips)/plan-trip/select-accommodation" as RelativePathString,
        TRIP_REVIEW:
          "/(root)/(trips)/plan-trip/trip-review" as RelativePathString,
      },

      REVIEW: {
        DETAIL: "/(root)/(trips)/review/[id]" as RelativePathString,
      },
    },
  },
} as const;
