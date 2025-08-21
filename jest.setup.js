/* eslint-disable no-undef */
jest.mock("react-native-vector-icons/FontAwesome", () => "Icon");
jest.mock("react-native-vector-icons/MaterialIcons", () => "Icon");
jest.mock("react-native-vector-icons/Ionicons", () => "Icon");
jest.mock("react-native-vector-icons/Feather", () => "Icon");
jest.mock("@expo/vector-icons", () => ({
  FontAwesome: "Icon",
  MaterialIcons: "Icon",
  Ionicons: "Icon",
  Feather: "Icon",
}));

// AsyncStorage official mock
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

// Reanimated mock (prevents native errors)
jest.mock("react-native-reanimated", () =>
  require("react-native-reanimated/mock"),
);

// SafeAreaContext mock (avoid layout errors)
jest.mock("react-native-safe-area-context", () => {
  const inset = { top: 0, left: 0, right: 0, bottom: 0 };
  return {
    ...jest.requireActual("react-native-safe-area-context"),
    SafeAreaProvider: ({ children }) => children,
    SafeAreaView: ({ children }) => children,
    useSafeAreaInsets: () => inset,
    initialWindowMetrics: {
      frame: { x: 0, y: 0, width: 0, height: 0 },
      insets: inset,
    },
  };
});

// Testing Library matchers (nicer assertions)
require("@testing-library/jest-native/extend-expect");
