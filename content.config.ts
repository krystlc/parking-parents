import { defineCollection, defineContentConfig } from "@nuxt/content";
import { z } from 'zod/v4'

// 1. Define the "Source of Truth" for your filters
export const TERRAIN_TYPES = ["rubber", "woodchips", "paved", "grass"] as const;
export const PARKING_TYPES = ["free", "paid", "none"] as const;
export const AGE_GROUPS = ["infant", "toddler", "young_child", "big_kid"] as const;

const parkSchema = z.object({
  title: z.string().min(5).max(60),
  description: z.string().min(50).max(160), // Forces SEO-friendly lengths

  // Structured Address for JSON-LD
  address: z.object({
    street: z.string(),
    city: z.string().default("Tampa"),
    state: z.string().length(2).default("FL"),
    zip: z.string().optional()
  }),

  coordinates: z.tuple([z.number(), z.number()]),

  // Amenities
  fenced: z.boolean().default(false),
  restrooms: z.boolean().default(false),
  shade: z.boolean().default(false),
  babySwings: z.boolean().default(false),
  strollerFriendly: z.boolean().default(true),

  // Use the const arrays here
  terrain: z.array(z.enum(TERRAIN_TYPES)),
  parking: z.enum(PARKING_TYPES),
  ageGroup: z.array(z.enum(AGE_GROUPS)),

  // Optional photo for the Map Drawer/Card
  featuredImage: z.url().optional(),
});

const updateSchema = z.object({
  title: z.string().min(5).max(70),
  description: z.string().max(160),
  date: z
    .string()
    // Ensure the input string is 8 characters long and contains only digits
    .regex(/^\d{8}$/, { message: "Must be in YYYYMMDD format" })
    // Transform "YYYYMMDD" into "YYYY-MM-DD"
    .transform((val) => `${val.substring(0, 4)}-${val.substring(4, 6)}-${val.substring(6, 8)}`)
    // Validate that the new string is a valid ISO date (e.g., checks for valid month/day combinations)
    .pipe(z.iso.date()),
  vibe: z.array(z.string()).min(1),
  author: z.string().default("Pops"),
})

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: "page",
      source: "pages/**.md",
    }),
    parks: defineCollection({
      type: "page",
      source: "parks/**/index.md", // Only the main park files
      schema: parkSchema,
    }),
    updates: defineCollection({
      type: "page",
      source: "parks/**/[!index]*.md", // All other files in park folders
      schema: updateSchema,
    }),
  },
});
