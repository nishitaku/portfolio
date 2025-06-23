---
title: Astro v5 アップデート時の備忘録
pubDate: 2025-06-23T15:11:43.971Z
tags:
  - astro
heroImage: update-astro-v5.png
---

本サイトのAstroのバージョンをv5にあげた際の備忘録。 

[アップグレードガイド](https://docs.astro.build/ja/guides/upgrade-to/v5/)にしたがって、作業を進めた。


## Upgrade Astro

公式アップグレードコマンドを実行する。

```zsh
pnpm dlx @astrojs/upgrade
Packages: +27
+++++++++++++++++++++++++++
Progress: resolved 27, reused 14, downloaded 13, added 27, done

 astro   Integration upgrade in progress.

      ●  @astrojs/partytown will be updated from v2.1.0 to v2.1.4
      ●  @astrojs/rss will be updated from v4.0.6 to v4.0.12
      ●  @astrojs/sitemap will be updated from v3.2.1 to v3.4.1
      ▲  astro will be updated  from v4.9.2 to v5.9.2 
      ▲  @astrojs/mdx will be updated  from v3.0.1 to v4.3.0 
      ▲  @astrojs/tailwind will be updated  from v5.1.0 to v6.0.2 

  wait   Some packages have breaking changes. Continue?
         Yes

 check   Be sure to follow the CHANGELOGs.
         astro https://docs.astro.build/en/guides/upgrade-to/v5/
         @astrojs/mdx https://github.com/withastro/astro/blob/main/packages/integrations/mdx/CHANGELOG.md#430
         @astrojs/tailwind https://github.com/withastro/astro/blob/main/packages/integrations/tailwind/CHANGELOG.md#602

 ██████  Installing dependencies with pnpm...

╭─────╮  Houston:
│ ◠ ◡ ◠  Can't wait to see what you build.
╰─────╯
```

とくに問題は発生せず。


## Content Collection to Content Layer

記事などのコンテンツコレクションを参照するAPIとして使われている`Content Collections API`が、Astro v5ではレガシー機能となり、`Content Layer API`を使うことを推奨しているため、置き換えていく。

詳細は[こちら](https://docs.astro.build/ja/guides/upgrade-to/v5/#updating-existing-collections)。

### 設定ファイルの移動

`src/content/content.config.ts`から、`src/content.config.ts`に移動。

### コレクション定義の変更

`defineCollection`の`type`の代わりに、`loader`を使って、より柔軟にコレクションを取得できるようになった。

```diff
import { defineCollection, z } from 'astro:content';
+ import { glob } from 'astro/loaders';

const blog = defineCollection({
  // For content layer you no longer define a `type`
- type: 'content',
+ loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/data/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
  }),
});
```

### `slug`を`id`に変更

APIで取得したコンテンツコレクションのキーが、`slug`から`id`に変更された。

```diff
---
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
-   params: { slug: post.slug },
+   params: { slug: post.id },
    props: post,
  }));
}
---
```
ファイル名も、`[slug].astro`から`[id].astro`に変更。

### `render`関数の変更

コンテンツのレンダリング関数が変更された。

```diff
---
import { getEntry, render } from 'astro:content';

const post = await getEntry('blog', params.slug);

- const { Content, headings } = await post.render();
+ const { Content, headings } = await render(post);
---
<Content />
```

## TypeScriptの設定変更

`src/env.d.ts`が削除されて、ローカルキャッシュの`.astro/types.d.ts`を型参照に使用するようになったため、`tsconfig.json`の設定を変更。

詳細は[こちら](https://docs.astro.build/ja/guides/upgrade-to/v5/#changed-typescript-configuration)

```diff
{
  "extends": "astro/tsconfigs/base",
+ "include": [".astro/types.d.ts", "**/*"],
+ "exclude": ["dist"]
}
```


## その他の修正

### 型チェックの厳密化

Astro v5とは関係ないが、調べてるときに気付いたため、対応しておいた。

```diff
{
- "extends": "astro/tsconfigs/base",
+ "extends": "astro/tsconfigs/strictest",
}
```

### tsエラーの修正

気付いたら以下のエラーが出ていたので、修正。

`'GetStaticPaths' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.ts(1484)`

```diff
- import { GetStaticPaths } from 'astro';
+ import { type GetStaticPaths } from 'astro';
```


## ソースコード

<iframe class="hatenablogcard border-none w-full" src="https://hatenablog-parts.com/embed?url=https://github.com/nishitaku/portfolio/pull/57/files" height="155"></iframe>


<iframe class="hatenablogcard border-none w-full" src="https://hatenablog-parts.com/embed?url=https://github.com/nishitaku/portfolio/pull/58/files" height="155"></iframe>