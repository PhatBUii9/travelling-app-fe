import { z } from "zod";

export const TripCitySchema = z
  .object({
    cityId: z.string().min(1),
    cityName: z.string().min(1, "City name is required"),
    country: z.string().optional(),
    startDate: z.date(),
    endDate: z.date(),
    activities: z.array(z.any()).default([]),
    restaurants: z.array(z.any()).optional(),
    accommodations: z.array(z.any()).optional(),
  })
  .refine((c) => c.startDate <= c.endDate, {
    message: "City end date must be after or equal to start date",
    path: ["endDate"],
  });

export const TripSchema = z
  .object({
    title: z.string().min(1, "Trip title is required"),
    startDate: z.date(),
    endDate: z.date(),
    cities: z.array(TripCitySchema).min(1, "At least one city is required"),
  })
  .refine((t) => t.startDate <= t.endDate, {
    message: "Trip end date must be after or equal to start date",
    path: ["endDate"],
  })
  .refine((t) => t.cities.some((c) => (c.activities?.length ?? 0) > 0), {
    message: "Add at least one activity in any city",
    path: ["cities"],
  });

//  Helper to map your CityBlock into schema-ready shape
export const toCityForValidation = (c: any) => ({
  ...c,
  startDate: new Date(c.startDate),
  endDate: new Date(c.endDate),
});

// Helper for showing multiple error messages in alerts
export const getZodErrorMessages = (err: z.ZodError) =>
  Array.from(new Set(err.issues.map((i) => i.message)))
    .slice(0, 3)
    .join("\n");
