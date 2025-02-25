---
title: |
  PHPカンファレンス名古屋2025に参加してきた #phpcon_nagoya
pubDate: 2025-02-25T01:33:59.339Z
heroImage: php-conference-nagoya-2025.png
---

2/22(土)に開催された「PHPカンファレンス名古屋」にオフライン参加してきた。

<iframe class="hatenablogcard border-none w-full" src="https://hatenablog-parts.com/embed?url=https://phpcon.nagoya/2025/" height="155"></iframe>

自分はPHPerどころかバックエンドエンジニアですらないが、こんな理由で参加を決めた。

- PHPに限定しないテーマのセッションも多い
- 名古屋開催だった
- lacolacoさんもPHPカンファレンス福岡2023に参加してた
<iframe class="hatenablogcard border-none w-full" src="https://hatenablog-parts.com/embed?url=https://blog.lacolaco.net/posts/php-conference-fukuoka-2023/" height="155"></iframe>


## 当日

岐阜は朝からベタ雪が降っていて、少し遅れてしまったが、無事に会場のウインクあいちに到着。
余談だが、岐阜から東海道本線で名古屋駅に来た場合、一番北側のプラットフォームに到着するので、中央出口に出るときは便利。逆に新幹線は一番南側なので、少し遠い。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">遅れて参加<a href="https://twitter.com/hashtag/phpcon_nagoya?src=hash&amp;ref_src=twsrc%5Etfw">#phpcon_nagoya</a> <a href="https://t.co/WPNLpxH5XQ">pic.twitter.com/WPNLpxH5XQ</a></p>&mdash; nishitaku@フリーランスエンジニア (@nishitaku_dev) <a href="https://twitter.com/nishitaku_dev/status/1893143609584545958?ref_src=twsrc%5Etfw">February 22, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


## 聴講したセッション

テスト、設計原則、アーキテクチャ関連のセッションを中心に聞いた。


### 『テスト書いた方が開発が早いじゃん』を解き明かす

<iframe class="hatenablogcard border-none w-full" src="https://hatenablog-parts.com/embed?url=https://fortee.jp/phpcon-nagoya-2025/proposal/436ec84b-1ab6-46a4-abb8-a29abaf8a817" height="155"></iframe>

「プログラミング」という難しい作業に対して、「テスト」がなぜ有効なのかを体系的かつ具体例を交えて整理していて、とても納得感があった。テストにネガティブな環境でも、できることはたくさんあると学べた。

Copilotのおかげでコーディングの速度は上がったが、設計や保守のコストは依然としてかかる。
環境を変えていくには、このくらいキャッチーなフレーズが必要なのかもしれないが、テストは必ずしも万能ではない。


### 設計原則、アーキテクチャパターン、アーキテクチャスタイルの違いって何？いつどう向き合ったらいいの？を考えてみる

<iframe class="hatenablogcard border-none w-full" src="https://hatenablog-parts.com/embed?url=https://fortee.jp/phpcon-nagoya-2025/proposal/bed84171-b7c6-45b6-8048-4f6e5c5ef15a" height="155"></iframe>

セッション後半の「設計原則やアーキテクチャをビジネスの現場でどう活かすか」の話が特に勉強になった。
普段フレームワークを使っていると忘れがちだが、設計原則の徹底やアーキテクチャの見直しは常に意識していきたい。


### クリーンアーキテクチャから見る依存の向きの大切さ

<iframe class="hatenablogcard border-none w-full" src="https://hatenablog-parts.com/embed?url=https://fortee.jp/phpcon-nagoya-2025/proposal/1b879fa8-1d32-49b9-9d6e-d013b1dcd76b" height="155"></iframe>

DIP（依存性逆転の原則）の話。普段あまり実践する機会がないので、改めて学べてよかった。
スライドも分かりやすく、「変わるもの」と「変わらないもの」の線引きが重要という話が印象的だった。


### もう一度やり直せるならこうする：テックリードの経験から学んだ設計の教訓

<iframe class="hatenablogcard border-none w-full" src="https://hatenablog-parts.com/embed?url=https://fortee.jp/phpcon-nagoya-2025/proposal/60e9a83b-39db-4813-a732-4dfcd62ca1a6" height="155"></iframe>

ドキュメント運用の話が個人的にタイムリーな話題で、興味深かった。
ADR（Architecture Decision Record）という用語を初めて知り、勉強になった。
GitHub Discussionsを使ったドキュメント運用について、階層構造の表現をどうしているのか気になった。


### 仕様変更に耐えるための"今の"DRY原則を考える

<iframe class="hatenablogcard border-none w-full" src="https://hatenablog-parts.com/embed?url=https://fortee.jp/phpcon-nagoya-2025/proposal/a43b3ab1-39b2-43d0-afdb-8e6428de0b96" height="155"></iframe>

スライドが見やすく、DRY原則について再考させられた。
「それって本当に共通化すべき？」という問いは常に持ち続けたい。
あと、実例にあったメソッドは、フラグ引数のアンチパターンにもなっていたので、そういった観点があってもよさそう。


## スポンサーブース

カルテットコミュニケーションズさんのブースに立ち寄ったところ、PHPのイベントなのにAngularの話で盛り上がった。
貴重な中部地方のAngular Developerと知り合えてよかった。

Findyさんでは、AIツールの導入が採用側でも当たり前になってきているという話を聞いた。
「AI適正の高いエンジニアの市場価値が上がっている」というのは納得感がある。


## 総括

PHPが分からなくても十分楽しめた。言語やフレームワークが違っても、根本的な考え方は共通していると再認識。
また、普段一人で作業していると忘れがちだが、「エンジニアはたくさんいる」という当たり前の事実が、良い刺激になった。

運営も素晴らしく、コーヒーおかわり自由がありがたかった。
涼宮ハルヒ世代なので、平野綾さんのタイトルコールには密かにテンションが上がった。

唯一の心残りは「アンチボッチランチ」に参加できなかったこと。次回はぜひ。


## さいごに

運営・登壇者のみなさま、お疲れ様でした！

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">一足先に失礼します。久々のオフラインイベント楽しかったです！<a href="https://twitter.com/hashtag/phpcon_nagoya?src=hash&amp;ref_src=twsrc%5Etfw">#phpcon_nagoya</a> <a href="https://t.co/zGGiRYebIq">pic.twitter.com/zGGiRYebIq</a></p>&mdash; nishitaku@フリーランスエンジニア (@nishitaku_dev) <a href="https://twitter.com/nishitaku_dev/status/1893202777980977400?ref_src=twsrc%5Etfw">February 22, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

