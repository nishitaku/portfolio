---
title: daisyUI v5 (TailwindCSS v4) にアップデートしたときのメモ
pubDate: 2025-06-26T23:38:54.116Z
tags:
  - astro
---

本サイトで利用しているUIコンポーネントライブラリ[daisyUI](https://daisyui.com/)をv5に、[TailwindCSS]()をv4にそれぞれアップデートした。その際の対応内容を備忘録として残しておく。

daisyUIの[アップグレードガイド](https://daisyui.com/docs/upgrade/)を参考にしつつ、Astro プロジェクトでの TailwindCSS v4 導入に関しては[Astro公式ドキュメント](https://docs.astro.build/en/guides/styling/#add-tailwind-4)も併せて参照しながら進めた。にしたがって、作業を進めた。

## Update TailwindCSS

TailwindCSS v4 では Vite プラグインとしての提供形式に変わったため、従来の`@astrojs/tailwind`をそのままアップデートするのではなく、`@tailwindcss/vite`に切り替える必要がある。

まず以下のコマンドを実行し、Vite 版を追加する。

```zsh
pnpm astro add tailwind

> portfolio-astro@2.5.0 astro /Users/nishitaku/workspace/astro/portfolio
> astro "add" "tailwind"

✔ Resolving packages...

  Astro will run the following command:
  If you skip this step, you can always run it yourself later

 ╭─────────────────────────────────────────────────────────╮
 │ pnpm add @tailwindcss/vite@^4.1.10 tailwindcss@^4.1.10  │
 ╰─────────────────────────────────────────────────────────╯

✔ Continue? … yes
⠸ Installing dependencies...
✔ Installing dependencies...

  Astro will make the following changes to your config file:

 ╭ astro.config.mjs ────────────────────────────────────╮
 │ import mdx from '@astrojs/mdx';                      │
 │ import partytown from '@astrojs/partytown';          │
 │ import sitemap from '@astrojs/sitemap';              │
 │ import tailwind from '@astrojs/tailwind';            │
 │ import icon from 'astro-icon';                       │
 │ import { defineConfig } from 'astro/config';         │
 │                                                      │
 │ import tailwindcss from '@tailwindcss/vite';         │
 │                                                      │
 │ // https://astro.build/config                        │
 │ export default defineConfig({                        │
 │   site: 'https://nishitaku.github.io',               │
 │   base: 'portfolio/',                                │
 │                                                      │
 │   integrations: [                                    │
 │     mdx(),                                           │
 │     sitemap(),                                       │
 │     tailwind(),                                      │
 │     partytown({                                      │
 │       // Adds dataLayer.push as a forwarding-event.  │
 │       config: {                                      │
 │         forward: ['dataLayer.push'],                 │
 │       },                                             │
 │     }),                                              │
 │     icon(),                                          │
 │   ],                                                 │
 │                                                      │
 │   vite: {                                            │
 │     plugins: [tailwindcss()],                        │
 │   },                                                 │
 │ });                                                  │
 ╰──────────────────────────────────────────────────────╯

✔ Continue? … yes
  
   success  Added the following integration to your project:
  - tailwind
  
   action required  You must import your Tailwind stylesheet, e.g. in a shared layout:

 ╭ src/layouts/Layout.astro ─────────╮
 │ ---                               │
 │ import './src/styles/global.css'  │
 │ ---                               │
 ╰───────────────────────────────────╯
```

このコマンドにより、以下が自動的に反映される
- `@tailwindcss/vite`のインストール
- `astro.config.mjs`に`vite.plugins`の追加


次に、不要になった`@astrojs/tailwind`を削除

```zsh
pnpm remove @astrojs/tailwind
```

`astro.config.mjs`も以下のように修正

```diff
+ import tailwindcss from '@tailwindcss/vite';
- import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
-   tailwind(),
  ],
+ vite: {
+   plugins: [tailwindcss()],
+ },
});
```

## Update daisyUI

daisyUIは最新版にアップデート

```zsh
pnpm i daisyui@latest
```

TailwindCSS v4 からは`tailwind.config.mjs`が廃止され、設定はCSS側で行う方式に変更されたため、それに対応する。

従来の tailwind.config.mjs は以下のようになっていた


```js
/** @type {import('tailwindcss').Config} */	
module.exports = {	
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],	
  theme: {	
    extend: {},	
  },	
  plugins: [require('@tailwindcss/typography'), require('daisyui')],	
  daisyui: {	
    themes: true, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]	
    darkTheme: 'dark', // name of one of the included themes for dark mode	
    logs: false, // Shows info about daisyUI version and used config in the console when building your CSS	
  },	
};
```

これを CSS 側で以下のように定義

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
@plugin "daisyui" {
  themes: light --default, dark --prefersdark, corporate;
}
```

なお、`content`によるテンプレートファイルの指定は不要そうだったため、削除している([参考](https://azukiazusa.dev/blog/tailwind-css-v4-css-first-configurations/#%E3%83%86%E3%83%B3%E3%83%97%E3%83%AC%E3%83%BC%E3%83%88%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AE%E6%8C%87%E5%AE%9A))


## v4 → v5 による daisyUI の見た目変更対応

アップデートにより見た目が変化した一部コンポーネントは、以下のように修正。

### Footer

```diff
- <footer class="footer footer-center mb-5 block pt-10">
+ <footer class="footer sm:footer-horizontal footer-center mb-5 block pt-10">
```

### Menu

```diff
- <ul class="menu menu-md shrink grow overflow-y-auto">
+ <ul class="menu menu-md w-full shrink grow overflow-y-auto">
```


## ソースコード

<iframe class="hatenablogcard border-none w-full" src="https://hatenablog-parts.com/embed?url=https://github.com/nishitaku/portfolio/pull/59/files" height="155"></iframe>
