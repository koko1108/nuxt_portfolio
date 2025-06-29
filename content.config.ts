import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source: "**/*.md",
      schema: z.object({
        date: z.string(),
        title: z.string(),
        description: z.string().optional(),
        cover: z.string().optional(),
        tags: z.array(z.string()).optional(),
      }),
    }),
  },
});
