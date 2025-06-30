---
title: Astro v5 Content Layer でZennとQiitaの記事を表示する
pubDate: 2025-06-30T00:35:50.168Z
tags:
  - astro
heroImage: show-zenn-qiita-blog.png
---


[Blogページ](https://nishitaku.github.io/portfolio/blog/)に、ZennとQiitaに投稿した記事が表示されるようにした。

Astro v5で対応したContent Layer APIを使って、実装していく。

Content Layerを使う方法は主に2通りある。
- コミュニティ製のLoader(例：[astro-qiita-loader](https://github.com/t0yohei/astro-qiita-loader))を使う
- 自作のカスタムLoaderを実装する

今回は、一覧を取得して最低限の情報を使いたいだけだったため、自分で実装した。


## API仕様の調査

まずは各APIの仕様を調査する。

### Zenn

Zennは公式にAPIを公開していないが、以下エンドポイントからjson形式で記事一覧を取得できる。

```
https://zenn.dev/api/articles?username=nishitaku
```

<details>
<summary>レスポンス</summary>

```json
{
  "articles": [
    {
      "id": 424763,
      "post_type": "Article",
      "title": "Angularのホスト要素を動的にスタイリングする方法",
      "slug": "cfb2aecca5d5dd",
      "comments_count": 0,
      "liked_count": 1,
      "bookmarked_count": 0,
      "body_letters_count": 3566,
      "article_type": "tech",
      "emoji": "☕",
      "is_suspending_private": false,
      "published_at": "2025-06-28T23:41:40.684+09:00",
      "body_updated_at": "2025-06-28T23:58:24.528+09:00",
      "source_repo_updated_at": null,
      "pinned": false,
      "path": "/nishitaku/articles/cfb2aecca5d5dd",
      "user": {
        "id": 2815,
        "username": "nishitaku",
        "name": "nishitaku",
        "avatar_small_url": "https://res.cloudinary.com/zenn/image/fetch/s--fL2Ewdu5--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_70/https://storage.googleapis.com/zenn-user-upload/avatar/96e3ef1a0e.jpeg"
      },
      "publication": null
    },
  ]
 }
```
</details>

### Qiita

QiitaのAPIは[こちら](https://qiita.com/api/v2/docs)に公開されている。  
ビルド時に一度だけ取得する今回の用途では、認証不要。記事件数も少ないため、ページネーションも考慮しない。

自分の公開記事一覧を取得するエンドポイントはこちら。

```
https://qiita.com/api/v2/items?page=1&per_page=100&query=user:nishitaku
```

<details>
<summary>レスポンス</summary>

```json
[
  {
    "rendered_body": "省略",
    "body": "省略",
    "coediting": false,
    "comments_count": 0,
    "created_at": "2023-12-14T14:55:26+09:00",
    "group": null,
    "id": "b67e14a08d47447b0c37",
    "likes_count": 7,
    "private": false,
    "reactions_count": 0,
    "stocks_count": 1,
    "tags": [
      {
        "name": "Angular",
        "versions": []
      },
      {
        "name": "SSG",
        "versions": []
      },
      {
        "name": "ssr",
        "versions": []
      },
      {
        "name": "AdventCalendar2023",
        "versions": []
      }
    ],
    "title": "AngularではじめるSSR入門",
    "updated_at": "2023-12-15T08:46:07+09:00",
    "url": "https://qiita.com/nishitaku/items/b67e14a08d47447b0c37",
    "user": {
      "description": "Angularできます",
      "facebook_id": "",
      "followees_count": 3,
      "followers_count": 10,
      "github_login_name": "nishitaku",
      "id": "nishitaku",
      "items_count": 15,
      "linkedin_id": "",
      "location": "岐阜市",
      "name": "",
      "organization": "フリーランス",
      "permanent_id": 187787,
      "profile_image_url": "https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/187787/profile-images/1564643959",
      "team_only": false,
      "twitter_screen_name": "nishitaku_dev",
      "website_url": "https://nishitaku.github.io/portfolio"
    },
    "page_views_count": null,
    "team_membership": null,
    "organization_url_name": null,
    "slide": false
  },
]
```
</details>


## カスタムLoaderを実装する


`content.config.ts` にZenn/Qiita用のプロパティを追加する。

```diff
const blogSchema = z.object({
  title: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),
+ link: z.string().optional(),
  tags: z.array(z.string()).optional(),
});
```

[Astro公式ドキュメント](https://docs.astro.build/en/guides/content-collections/#building-a-custom-loader)を参考に、Collectionの定義に、ZennとQiitaのカスタムLoaderを追加する。


```diff
const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: blogSchema,
});

+ const zennCollection = defineCollection({
+   loader: async () => {
+     const res = await fetch('https://zenn.dev/api/articles?username=nishitaku');
+     const data = await res.json();
+     return data.articles.map((article: any) => ({
+       id: article.slug, // article.idはnumberのためslugを使用
+       title: article.title,
+       pubDate: article.published_at,
+       updatedDate: article.body_updated_at,
+       link: `https://zenn.dev${article.path}`,
+       tags: ['zenn'],
+     }));
+   },
+   schema: blogSchema,
+ });

+ const qiitaCollection = defineCollection({
+   loader: async () => {
+     const res = await fetch(
+       'https://qiita.com/api/v2/items?page=1&per_page=100&query=user:nishitaku',
+     );
+     const data = await res.json();
+     return data.map((article: any) => ({
+       id: article.id,
+       title: article.title,
+       pubDate: article.created_at,
+       updatedDate: article.updated_at,
+       link: article.url,
+       tags: ['qiita'],
+     }));
+   },
+   schema: blogSchema,
+ });

export const collections = {
  blog: blogCollection,
+ zenn: zennCollection,
+ qiita: qiitaCollection,
};
```

ZennのAPIレスポンスでは `id` がnumber型になっており、`[ContentLoaderReturnsInvalidId] The content loader for the collection zenn returned an entry with an invalid id:`のエラーが発生したため、代わりにstring型である `slug` を `id` として使用した。

最後に、一覧画面で`getCollection`する。

```astro
---
import { getCollection } from 'astro:content';

const blogPosts = await getCollection('blog');
const zennPosts = await getCollection('zenn');
const qiitaPosts = await getCollection('qiita');

const allPosts = [...blogPosts, ...zennPosts, ...qiitaPosts];
allPosts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
---
```

## 感想

Content Layerの柔軟性のおかげで、外部APIと連携した記事一覧の取得も意外とシンプルに実装できた。
他の外部サービスにも応用できそう。


## ソースコード

<iframe class="hatenablogcard border-none w-full" src="https://hatenablog-parts.com/embed?url=https://github.com/nishitaku/portfolio/pull/65/files" height="155"></iframe>


<iframe class="hatenablogcard border-none w-full" src="https://hatenablog-parts.com/embed?url=https://github.com/nishitaku/portfolio/pull/67/files" height="155"></iframe>


## 参考

<iframe class="hatenablogcard border-none w-full" src="https://hatenablog-parts.com/embed?url=https://ikuma-t.com/blog/astro-content-layer/" height="155"></iframe>
