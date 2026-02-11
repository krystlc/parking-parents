import { defineCollection, defineContentConfig, z } from "@nuxt/content";

const parksScheme = z.object({
  title: z.string().min(5).max(60),
  description: z.string().min(50).max(160), // Forces SEO-friendly lengths
  address: z.string(),
  coordinates: z.tuple([z.number(), z.number()]), // [lat, lng] for the map
  // Amenities Checkboxes
  fenced: z.boolean().default(false),
  restrooms: z.boolean().default(false),
  shade: z.boolean().default(false),
  babySwings: z.boolean().default(false),
  terrain: z.array(z.enum(["rubber", "woodchips", "paved", "grass"])),
  // Accessibility / Extras
  parking: z.enum(["free", "paid", "none"]),
  strollerFriendly: z.boolean().default(true),
  ageGroup: z.array(z.enum(["infant", "toddler", "young_child", "big_kid"])),
  // Social
  featuredImage: z.string().optional(),
});

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: "page",
      source: "pages/**.md",
    }),
    parks: defineCollection({
      type: "page",
      source: "parks/**/index.md", // Only the main park files
      schema: parksScheme,
    }),
    updates: defineCollection({
      type: "page",
      source: "parks/**/[!index]*.md", // All other files in park folders
      schema: z.object({
        title: z.string().min(5).max(70),
        description: z.string().max(160),
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // Format: YYYY-MM-DD
        parkId: z.string(), // Must match the folder name of the parent park
        vibe: z.array(z.string()).min(1), // e.g., ['Quiet', 'High Energy', 'Social']
        author: z.string().default("Papa"),
      }),
    }),
  },
});
