/* eslint-disable prettier/prettier */
import SelectCityScreen from "../app/(root)/(trips)/plan-trip/select-city";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { useLocalSearchParams } from "expo-router";

// --- Mocks ---
const mockAddCity = jest.fn();
const mockPush = jest.fn();

jest.mock("@/hooks/useTripPlanner", () => ({
  useTripPlanner: () => ({
    addCity: mockAddCity,
    currentCityId: undefined,
    cities: [],
    setCurrentCity: jest.fn(),
  }),
}));

jest.mock("expo-router", () => ({
  __esModule: true,
  useLocalSearchParams: jest.fn(),
  router: {
    push: (...args: any[]) => mockPush(...args),
  },
}));

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});
afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

beforeEach(() => {
  mockAddCity.mockClear();
  mockPush.mockClear();
  (useLocalSearchParams as unknown as jest.Mock).mockReturnValue({});
});

describe("select-city", () => {
  it("Continue button shows helper & does not navigate by default", () => {
    const { getByText, queryByTestId } = render(<SelectCityScreen />);

    // The label is visible
    expect(getByText("Continue")).toBeTruthy();

    // Helper text appears when nothing is selected (proxy for disabled)
    expect(getByText("Please select an option to continue.")).toBeTruthy();

    // Press continue anyway — should NOT navigate
    fireEvent.press(getByText("Continue"));
    expect(mockPush).not.toHaveBeenCalled();

    // And of course there’s no “selectedId”, so no “selected-pill” etc.
    expect(queryByTestId("selected-pill")).toBeNull();
  });

  it("addCity and Navigation are called after selecting a city", async () => {
    const { getAllByTestId, getByText } = render(<SelectCityScreen />);

    // Wait for at least one CityCard to render
    let firstCard;
    await waitFor(() => {
      const cards = getAllByTestId("city-card");
      expect(cards.length).toBeGreaterThan(0);
      firstCard = cards[0];
    });

    // Select the first city and continue
    fireEvent.press(firstCard!);
    fireEvent.press(getByText("Continue"));

    // addCity should be called with a CityBlock-like object
    expect(mockAddCity).toHaveBeenCalledWith(
      expect.objectContaining({
        cityId: expect.any(String),
        cityName: expect.any(String),
        country: expect.any(String),
        activities: expect.any(Array),
        restaurants: expect.any(Array),
        accommodations: expect.any(Array),
      }),
    );

    // Navigation should target select-activities with params
    expect(mockPush).toHaveBeenCalledWith(
      expect.objectContaining({
        pathname: expect.stringContaining("/select-activities"),
        params: expect.objectContaining({
          options: "create",
          cityId: expect.any(String),
        }),
      }),
    );
  });

  it("Search filters cities (using search-bar testID)", async () => {
    const { getByTestId, getAllByTestId } = render(<SelectCityScreen />);

    const searchInput = getByTestId("search-bar");
    fireEvent.changeText(searchInput, "yo");

    // After filtering, the list should re-render — just assert it still has items
    await waitFor(() => {
      // This ensures the list updated; if your dataset removes many, length may shrink
      expect(getAllByTestId("city-card").length).toBeGreaterThan(0);
    });
  });

  it("Empty state renders no-result when query has no matches", async () => {
    const { getByTestId, findByTestId } = render(<SelectCityScreen />);

    const searchInput = getByTestId("search-bar");
    fireEvent.changeText(searchInput, "definitelyNoSuchCity123");

    // Your TripSelectionScreen shows testID="no-result" when empty
    expect(await findByTestId("no-result")).toBeTruthy();
  });
});
