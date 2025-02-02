import { defineCollection, z } from 'astro:content';

const blogSchema = z.object({
  title: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type BlogSchema = z.infer<typeof blogSchema>;

const blogCollection = defineCollection({ schema: blogSchema });

export const collections = {
  blog: blogCollection,
};
