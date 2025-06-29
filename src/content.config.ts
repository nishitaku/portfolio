import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blogSchema = z.object({
  title: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),
  link: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type BlogSchema = z.infer<typeof blogSchema>;

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: blogSchema,
});

const zennCollection = defineCollection({
  loader: async () => {
    const res = await fetch('https://zenn.dev/api/articles?username=nishitaku');
    const data = await res.json();
    return data.articles.map((article: any) => ({
      id: article.slug,
      title: article.title,
      pubDate: article.published_at,
      updatedDate: article.body_updated_at,
      link: `https://zenn.dev${article.path}`,
      tags: ['zenn'],
    }));
  },
  schema: blogSchema,
});

const qiitaCollection = defineCollection({
  loader: async () => {
    const res = await fetch(
      'https://qiita.com/api/v2/items?page=1&per_page=100&query=user:nishitaku',
    );
    const data = await res.json();
    return data.map((article: any) => ({
      id: article.id,
      title: article.title,
      pubDate: article.created_at,
      updatedDate: article.updated_at,
      link: article.url,
      tags: ['qiita'],
    }));
  },
  schema: blogSchema,
});

export const collections = {
  blog: blogCollection,
  zenn: zennCollection,
  qiita: qiitaCollection,
};
