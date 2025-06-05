import 'dotenv/config';

export default {
  expo: {
    name: "Travelling_Front_End",
    slug: "Travelling_Front_End",
    version: "1.0.0",
    orientation: "portrait",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    icon: "./assets/images/adaptive-icon.png",
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.anonymous.Travelling-Front-End",
      config: {
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.anonymous.Travelling_Front_End",
      softwareKeyboardLayoutMode: "adjustResize",
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    developer: {
      sourceMaps: true,
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
  },
};