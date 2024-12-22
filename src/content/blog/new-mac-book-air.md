---
title: とあるフロントエンドエンジニアの開発環境（アプリ編）
pubDate: 2024-12-22T04:32:47.032Z
tags:
  - 開発環境
---

新しい MacBook を購入し、開発環境を構築したのでインストールしたアプリケーションを紹介していく。
なお、Mac mini をメインPCとして使用しており、こちらにも同じ構成を適用する。
参考になる部分があれば幸いだ。

## PCスペック

- MacBook Air 13インチ M3 2024
- メモリ 24GB（デフォルト16GB）
- ストレージ 1TB（デフォルト500GB）

**Air** を選んだ理由
- **予算**: 上限30万（少額減価償却資産の上限）でメモリ増設が必須だったため。**Pro**だとオーバーする
- **携帯性**: 持ち運びやすい13インチ。**Pro** は14インチ以上のみ
- **性能十分** メインPCの Mac mini は3年前のモデルだが、問題なく使えている


## アプリケーションのインストール

すべて `Homebrew`を利用してインストールした。
将来的に負債を避けるため、`Rosetta`は必要になるまで、インストール禁止。

### CommandLineTools

```zsh
xcode-select --install
```

### Homebrew

[公式サイト](https://brew.sh/ja/)のスクリプトを使用してインストール。

### Dropbox

クラウドストレージ。長年愛用中。

```zsh
brew install --cask dropbox
```

### KeePassXC

パスワード管理アプリ。

```zsh
brew install --cask keepassxc
```

### Google日本語入力

`Rosetta`が必要なためスキップ。代替アプリを模索中。

```zsh
brew install --cask google-japanese-ime

installer: This package requires Rosetta 2 to be installed.
```

### Slack

コミュニケーションツール。インストール後に、ワークスペースを追加。

```zsh
brew install --cask slack
```

### Raycast

ランチャーアプリ。Free版。
`KeePassXC`の Extension を使うと、ランチャーからパスワード、ユーザー名をコピペできるので超便利。
`QuickLinks`と`Snippets`の設定をメインPCから Export & Import しておく。

```zsh
brew install --cask raycast
```

### Arc

Chromiumベースのブラウザ。
Space ごとに Profile を紐付けて、Googleアカウントをシームレス切り替えられるのが便利。

`Arc`のアカウントでログインして、`Preferences > user > Sync Sidebar` でサイドバーを同期できる。
Favorite や Profile は同期できないので、手動で作成する必要がある。

```zsh
brew install --cask arc
```

### VSCode

IDE。拡張機能については別記事で紹介予定。

```zsh
brew install --cask visual-studio-code
```

### Discord

Angular コミュニティ用。

```zsh
brew install --cask discord
```

### Warp

メインPCでは`iTerm2`を使っているが、前から気になっていたので乗り換えてみた。
`.zshrc`がシンプルになってよい。`tmux`も不要。

Global Hotkeyを設定して、ワンタッチで表示できるように設定。
`iTerm2`で設定していたように、`Ctrl`のダブルタップを設定したかったが無理だった。
あと、たまに効かなくなるのが難点。
https://docs.warp.dev/features/windows/global-hotkey

```zsh
brew install --cask warp
```

### Sequal Ace

DBツール。

```zsh
brew install --cask sequel-ace
```

### Docker

`colima`を使用。

```zsh
brew install colima docker docker-compose
```

設定は少し変更。

```zsh
colima template

memory: 3
disk: 256
dns:
    - 8.8.8.8
    - 8.8.4.4
vmType: vz
mountType: virtiofs
```

### Node

`volta`で管理。

```zsh
brew install volta
volta install node
```


## まとめ

`Homebrew`を使ってインストールすることで管理が効率的になった。`brew update && brew upgrade`で一括更新できる。

唯一`Rosetta`が必要だったのは、`Google日本語入力`だけだった。
代替アプリを検討中なので、おすすめがあれば教えていただけるとうれしいです。

なお、今回紹介したアプリはすべて無料で利用可能。時代に感謝！
