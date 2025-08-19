import {
  TripSchema,
  TripCitySchema,
  toCityForValidation,
  getZodErrorMessages,
} from "@/validation/trip";

// ------------------------------
// Small helpers for consistent dates & factories
// ------------------------------
const d = (s: string) => new Date(s); // "2025-06-01" -> Date
const iso = (date: Date) => date.toISOString();

// Factory to create a valid city quickly
const makeCity = (overrides: Partial<any> = {}) => ({
  cityId: "c1",
  cityName: "Sydney",
  country: "Australia",
  startDate: d("2025-06-01"),
  endDate: d("2025-06-03"),
  activities: ["Bondi Beach"],
  restaurants: [],
  accommodations: [],
  ...overrides,
});

// ------------------------------
// TripCitySchema tests
// ------------------------------

describe("TripCitySchema", () => {
  test("valid city passes", () => {
    const res = TripCitySchema.safeParse(makeCity());
    expect(res.success).toBe(true);
  });

  test("city requires cityName", () => {
    const res = TripCitySchema.safeParse(makeCity({ cityName: "" }));
    expect(res.success).toBe(false);
    if (!res.success) {
      expect(getZodErrorMessages(res.error)).toMatch(/City name is required/);
    }
  });

  test("endDate must be after or equal to startDate", () => {
    const res = TripCitySchema.safeParse(
      makeCity({ startDate: d("2025-06-05"), endDate: d("2025-06-03") }),
    );
    expect(res.success).toBe(false);
    if (!res.success) {
      expect(getZodErrorMessages(res.error)).toMatch(
        /City end date must be after or equal to start date/,
      );
    }
  });
});

// ------------------------------
// TripSchema tests
// ------------------------------

describe("TripSchema", () => {
  test("valid trip with one city passes", () => {
    const cities = [makeCity()];
    const start = cities[0].startDate;
    const end = cities[0].endDate;

    const res = TripSchema.safeParse({
      title: "My Trip",
      startDate: start,
      endDate: end,
      cities,
    });

    expect(res.success).toBe(true);
  });

  test("title is required", () => {
    const cities = [makeCity()];
    const res = TripSchema.safeParse({
      title: "",
      startDate: cities[0].startDate,
      endDate: cities[0].endDate,
      cities,
    });

    expect(res.success).toBe(false);
    if (!res.success) {
      expect(getZodErrorMessages(res.error)).toMatch(/Trip title is required/);
    }
  });

  test("trip must have at least one city", () => {
    const res = TripSchema.safeParse({
      title: "Empty Trip",
      startDate: d("2025-06-01"),
      endDate: d("2025-06-02"),
      cities: [],
    });

    expect(res.success).toBe(false);
    if (!res.success) {
      expect(getZodErrorMessages(res.error)).toMatch(
        /At least one city is required/,
      );
    }
  });

  test("trip end date must be after or equal to start date", () => {
    const city = makeCity();
    const res = TripSchema.safeParse({
      title: "Backwards Trip",
      startDate: d("2025-06-10"),
      endDate: d("2025-06-01"),
      cities: [city],
    });

    expect(res.success).toBe(false);
    if (!res.success) {
      expect(getZodErrorMessages(res.error)).toMatch(
        /Trip end date must be after or equal to start date/,
      );
    }
  });

  test("requires at least one activity across cities", () => {
    const cityNoActivities = makeCity({ activities: [] });
    const res = TripSchema.safeParse({
      title: "No Activities",
      startDate: cityNoActivities.startDate,
      endDate: cityNoActivities.endDate,
      cities: [cityNoActivities],
    });

    expect(res.success).toBe(false);
    if (!res.success) {
      expect(getZodErrorMessages(res.error)).toMatch(
        /Add at least one activity in any city/,
      );
    }
  });
});

// ------------------------------
// Helper function tests
// ------------------------------

describe("Helpers", () => {
  test("toCityForValidation converts ISO string dates to Date objects", () => {
    const raw = {
      cityId: "c2",
      cityName: "Melbourne",
      startDate: iso(d("2025-07-01")),
      endDate: iso(d("2025-07-05")),
      activities: ["Laneways"],
    };
    const converted = toCityForValidation(raw);

    // After conversion, dates should be Date instances
    expect(converted.startDate instanceof Date).toBe(true);
    expect(converted.endDate instanceof Date).toBe(true);

    // And schema should now accept it
    const res = TripCitySchema.safeParse(converted);
    expect(res.success).toBe(true);
  });

  test("getZodErrorMessages returns unique, readable messages", () => {
    const badCity = {
      cityId: "",
      cityName: "",
      startDate: "not-a-date",
      endDate: "not-a-date",
      activities: [],
    } as any;

    const result = TripCitySchema.safeParse(badCity);

    expect(result.success).toBe(false);
    if (!result.success) {
      const msg = getZodErrorMessages(result.error);
      // We don’t assert exact text for all cases (Zod can vary),
      // but ensure it contains at least one known message.
      expect(msg).toEqual(expect.stringContaining("City name is required"));
    }
  });
});
