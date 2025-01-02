---
title: Angular をアップデートしたら iOS16 で動かなくなった話
pubDate: 2025-01-01T14:13:59.774Z
heroImage: angular-update-causes-issue-on-ios16.png
tags:
  - Angular
---

## はじめに

ある Angular アプリケーションが、一部端末で画面が表示されなくなる不具合が発生した。
アクセスログを解析したところ、 iOS16 のユーザーでエラーが発生していることが判明した。


## 原因と対応

Angular のバージョンを v15 から v17 にアップデートしたことで、iOS16 のブラウザががサポート対象外になってしまったことが原因だった。
当該アプリケーションでは Angular のデフォルト設定をサポート対象としていたため、`Browserslist`を、iOS16 をサポートするよう修正することで対応した。


## Browserslist

Angular は[`Browserslist`](https://github.com/browserslist/browserslist)を使って、サポートブラウザをビルドツールに伝えている。`Browserslist`は、クエリによって該当するブラウザのリストを取得する。

例えば、0.2% 以上のシェアがあり、メンテナンスが行われているブラウザは次のクエリで取得できる。

```browserslist
> 0.2%, not dead
```

このサイトでクエリの確認ができる。

<iframe class="hatenablogcard border-none w-full" src="https://hatenablog-parts.com/embed?url=https://browsersl.ist/" height="155"></iframe>

クエリは`package.json`の`browserslist`として指定するか、`.browserslistrc`を作成して記述すると認識される。Angular は、 v15 から`.browserslistrc`が削除されてオプトインとなり、何も設定しなければ、デフォルトの設定が適用される。

デフォルト設定は`ng g config browserslist`で出力できる。また、[公式サイト](https://angular.jp/reference/versions#%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E3%82%B5%E3%83%9D%E3%83%BC%E3%83%88)でも公表されている。

```browserslist
last 2 Chrome versions
last 1 Firefox version
last 2 Edge major versions
last 2 Safari major versions
last 2 iOS major versions
Firefox ESR
```

## caniuse-lite

`Browserslist`はクエリを用いて、[`caniuse-lite`](https://github.com/browserslist/caniuse-lite)から、ブラウザの一覧とそのバージョンを取得している。`caniuse-lite`はバージョニングされた静的データであるため、バージョンが異なると、`Browserslist`のクエリで取得される一覧も変わる。

そのため、Angular のバージョンがあがると、依存する`caniuse-lite`のバージョンがあがり、デフォルトで`Browserslist`に設定されている`last 2 iOS major versions`クエリによって取得できる一覧から、iOS16 が削除されたことにより、サポート対象外となってしまった。

`browserslist`コマンドでサポート対象のブラウザを確認できる。

まず、`@angular/cli@15.2.11`は`caniuse-lite@1.0.30001618`に依存している。
このバージョンでのサポート対象ブラウザは以下のとおり。

```zsh
% npx browserslist
chrome 124
chrome 123
edge 124
edge 123
firefox 125
firefox 115
ios_saf 17.5
ios_saf 17.4
ios_saf 17.3
ios_saf 17.2
ios_saf 17.1
ios_saf 17.0
ios_saf 16.6-16.7
ios_saf 16.5
ios_saf 16.4
ios_saf 16.3
ios_saf 16.2
ios_saf 16.1
ios_saf 16.0
safari 17.5
safari 17.4
safari 17.3
safari 17.2
safari 17.1
safari 17.0
safari 16.6
safari 16.5
safari 16.4
safari 16.3
safari 16.2
safari 16.1
safari 16.0
```

一方、`@angular/cli@17.3.11`は`caniuse-lite@1.0.30001686`に依存している。
このバージョンでのサポート対象ブラウザは以下のとおり。 iOS16 が含まれていないことがわかる。

```zsh
% npx browserslist
chrome 131
chrome 130
edge 131
edge 130
firefox 133
firefox 128
firefox 115
ios_saf 18.1
ios_saf 18.0
ios_saf 17.6-17.7
ios_saf 17.5
ios_saf 17.4
ios_saf 17.3
ios_saf 17.2
ios_saf 17.1
ios_saf 17.0
safari 18.1
safari 18.0
safari 17.6
safari 17.5
safari 17.4
safari 17.3
safari 17.2
safari 17.1
safari 17.0
```

## `Browserslist`を修正する

次のように、**最新の 3 つのメジャーバージョン**をクエリで指定することで、iOS16 をサポート対象に含めることができる。

```diff
last 2 Chrome versions
last 1 Firefox version
last 2 Edge major versions
last 2 Safari major versions
- last 2 iOS major versions
+ last 3 iOS major versions
Firefox ESR
```

修正後の`browserslist`コマンドの結果は以下のとおり。

```zsh
% npx browserslist
chrome 131
chrome 130
edge 131
edge 130
firefox 133
firefox 128
firefox 115
ios_saf 18.1
ios_saf 18.0
ios_saf 17.6-17.7
ios_saf 17.5
ios_saf 17.4
ios_saf 17.3
ios_saf 17.2
ios_saf 17.1
ios_saf 17.0
ios_saf 16.6-16.7
ios_saf 16.5
ios_saf 16.4
ios_saf 16.3
ios_saf 16.2
ios_saf 16.1
ios_saf 16.0
safari 18.1
safari 18.0
safari 17.6
safari 17.5
safari 17.4
safari 17.3
safari 17.2
safari 17.1
safari 17.0
```

## さいごに

現状、Angular のデフォルト設定は、ブラウザの最新バージョンがリリースされるたびに、動作しないバージョンが出てくるリスクがある。以下のような Pull Request も提出されているが、`Browserslist`で明示的に設定する方が安全だろう。

<iframe class="hatenablogcard border-none w-full" src="https://hatenablog-parts.com/embed?url=https://github.com/angular/angular-cli/pull/28719" height="155"></iframe>

また、Angular を v19 にアップデートすると、`Safari < 15`で動かなくなる問題があるため、注意が必要である。

<iframe class="hatenablogcard border-none w-full" src="https://hatenablog-parts.com/embed?url=https://github.com/angular/angular-cli/issues/29145" height="155"></iframe>

