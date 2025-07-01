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
