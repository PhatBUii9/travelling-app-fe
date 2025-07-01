/* eslint-disable prettier/prettier */
import SelectCityScreen from "../app/(root)/(trips)/plan-trip/select-city";
import { render, fireEvent } from "@testing-library/react-native";

const mockAddCity = jest.fn();
const mockPush = jest.fn();
const mockRouter = { push: mockPush };

jest.mock("@/hooks/useTripPlanner", () => ({
  useTripPlanner: () => ({
    addCity: mockAddCity,
  }),
}));
jest.mock("expo-router", () => ({
  __esModule: true,
  get router() {
    return mockRouter;
  },
}));

beforeEach(() => {
  mockAddCity.mockClear();
  mockPush.mockClear();
});

describe("select-city", () => {
  it("Continue button disable by default", () => {
    const { getByTestId, getByText } = render(<SelectCityScreen />);
    expect(getByTestId("continue-button")).toBeDisabled();

    expect(getByText("Continue")).toBeTruthy();
  });

  it("addCity and Navigation are called", () => {
    const { getByText } = render(<SelectCityScreen />);
    fireEvent.press(getByText("Paris"));
    fireEvent.press(getByText("Continue"));

    expect(mockAddCity).toHaveBeenCalledWith(
      expect.objectContaining({
        cityId: "paris",
        cityName: "Paris",
        country: "France",
      }),
    );

    expect(mockPush).toHaveBeenCalledWith(
      "/(root)/(trips)/plan-trip/select-places",
    );
  });

  it("Search filters cities", () => {
    const { getByPlaceholderText, queryByText } = render(<SelectCityScreen />);

    const searchInput = getByPlaceholderText("Search city...");
    fireEvent.changeText(searchInput, "yo");

    expect(queryByText("Tokyo")).toBeTruthy();
    expect(queryByText("New York")).toBeTruthy();
    expect(queryByText("Rome")).toBeNull();
    expect(queryByText("Paris")).toBeNull();
  });

  it("Empty state", () => {
    const { getByPlaceholderText, queryByTestId } = render(
      <SelectCityScreen />,
    );

    const searchInput = getByPlaceholderText("Search city...");
    fireEvent.changeText(searchInput, "Ha");

    expect(queryByTestId("no-result")).toBeTruthy();
  });
});
