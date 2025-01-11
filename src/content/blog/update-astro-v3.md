---
title: Astro v3にアップデートした
pubDate: 2024-05-17T08:49:08.599Z
tags:
  - astro
heroImage: update-astro-v3.png
---

本サイトで使っているAstroのバージョンをv3にあげた。
既にv4がリリースされているが、そちらは追々。

手順や変更点は[アップグレードガイド](https://docs.astro.build/ja/guides/upgrade-to/v3/)に丁寧に書かれている。

アップデート後にうまく動かなくなった箇所があったため、備忘録を残す。

ソースコードのdiffは[こちら](https://github.com/nishitaku/portfolio/compare/ac23c3c9060219f71c9f5f52056330f3daf0bb40...28b1653250843b6550d7fe6ad44bdbf9212357ad)

## 画面遷移が動かなくなった

本ブログは`/portfolio`のサブディレクトリにデプロイしているのだが、アップデート後に`<a href='./resume'></a>`のリンクをクリックすると、本来であれば`/portfolio/resume`に遷移してほしいのに、`/resume`に遷移してしまい、`404: Not found`になってしまう現象が発生した。

原因は、[デフォルトの変更: import.meta.env.BASE_URLのtrailingSlash](https://docs.astro.build/ja/guides/upgrade-to/v3/#%E3%83%87%E3%83%95%E3%82%A9%E3%83%AB%E3%83%88%E3%81%AE%E5%A4%89%E6%9B%B4-importmetaenvbase_url%E3%81%AEtrailingslash)だった。

`base`の末尾にスラッシュを追加して解決。

```diff
export default defineConfig({
  site: "https://nishitaku.github.io",
- base: "/portfolio",
+ base: "portfolio/",
});
```

## 本番環境でプロフィール画像が表示されなくなった

デプロイ先が`/portfolio/public/icon.jpg`から`portfolio/icon.jpg`になっていた。

参照先を変更してもよかったが、[v3.0の画像アップグレードアドバイス](https://docs.astro.build/ja/guides/images/)に

> ローカル画像は、Astroが変換、最適化、バンドルできるように、可能な限りsrc/に保存することをおすすめします。

とあったため、`icon.jpg`を`public`ディレクトリから`src/images`に移動して、`.astro`ファイルで`import`するようにした。

```astro
---
import iconImage from '../images/icon.jpg';
---

<Image src={iconImage} />
```

なお、OGP画像も同じ原因で表示されなくなっていたため、そちらは参照先を変更して対応した。
