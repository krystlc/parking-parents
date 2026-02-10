import { defineCollection, defineContentConfig, z } from "@nuxt/content";

const parksScheme = z.object({
  title: z.string(),
  fenced: z.boolean(),
  shade: z.boolean(),
  restrooms: z.boolean(),
  terrain: z.enum(["rubber", "woodchips", "paved"]),
  address: z.string(),
  latlng: z.array(z.number()),
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
        date: z.string(),
        parkId: z.string(), // To link it back to the park
        vibe: z.string(),
      }),
    }),
  },
});
