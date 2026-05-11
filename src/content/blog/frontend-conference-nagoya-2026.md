---
title: |
  フロントエンドカンファレンス名古屋2026に参加してきた #fec_nagoya
pubDate: 2026-05-09T15:41:58.563Z
tags:
  - イベント
---

[フロントエンドカンファレンス名古屋](https://fec-nagoya-org.github.io/2026/)に参加した。

会場は、去年参加したPHPカンファレンス名古屋2025と同じ、ウインクあいち。

岐阜から1時間ほどで行ける距離なので本当にありがたい。運営のみなさまに感謝。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">来ました<a href="https://twitter.com/hashtag/fec_nagoya?src=hash&amp;ref_src=twsrc%5Etfw">#fec_nagoya</a> <a href="https://t.co/N2Bfd2BjFx">pic.twitter.com/N2Bfd2BjFx</a></p>&mdash; nishitaku@フリーランスエンジニア (@nishitaku_dev) <a href="https://twitter.com/nishitaku_dev/status/2052924393018503579?ref_src=twsrc%5Etfw">May 9, 2026</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


## 聴講したセッション

### デザインとコードの境界を溶かす 

エイチーム(Qiita)プロダクトデザイナー、綿貫さんによる基調講演。

デザインと実装のズレは、デザイナーとエンジニアの境界から生まれる、という話。

実装を考慮していないデザインに苛立ったり、逆にデザイナーの意図を確認せず自己判断で実装を進めてしまったり、普段から感じている「違和感」が言語化されていて、終始	うなずきながら聞いていた。

印象に残ったのは、「デザインデータはスナップショット」という考え方。
デザインは特定条件下の1ケースに過ぎず、実際のプロダクトでは無数の状態を扱う。だからこそ、未定義ケースをどう扱うかという共通ルールが重要になる。

また、「100点を目指さない」という話もよかった。
デザインを完全再現しようとすると、実装や保守が極端に複雑になることがある。実装コストや事業価値とのバランスを見ながら、どこを守るべきかを共有することが大事。

実装を考慮していないように見えるデザインにも意図があるかもしれないし、逆にエンジニア側にも制約がある。
ぱっと見で判断せず、対話することの大切さを改めて感じた。


### フロントエンドの相手が変わった - AIが加わったWebの新しいインターフェース設計

<iframe class="hatenablogcard border-none w-full" src="https://hatenablog-parts.com/embed?url=https://speakerdeck.com/azukiazusa1/hurontoendonoxiang-shou-gabian-watuta-aigajia-watutawebnoxin-siiintahuesushe-ji" height="155"></iframe>


`The Web is for everyone`の`everyone`のAIが含まれるようになった、というのはまさに時代を象徴するフレーズだと思った。人間と同様、AIもWebの出力者(生成者)であり、消費者でもある。

AIの出力がストリーミングUIになる流れは理解していたが、`Generative UI`という概念は知らなかったのでかなり刺激を受けた。`MCP Apps`、`A2UI`、`json-render`など、追いかけるべき技術が一気に増えた感覚がある。

一方で、AIが「Webを読む」ための技術も同じくらい重要になってきていて、`llms.txt`、`WebMCP`、`ai-disclousure属性`といったキーワードも非常に興味深かった。学ぶことが本当に多い。

あと、[第二のレスポンシブ設計](https://takoratta.hatenablog.com/entry/2026/04/28/112859)の話も面白かった。
これまでの「画面サイズに応じて最適化するWeb」から、「人間とAIの両方に最適化するWeb」へ変わっていくのかもしれない。これからどう進化していくのか楽しみ。


### F8キーだけがバグる話 〜日本語IMEとフォームバリデーション設計〜

<iframe class="hatenablogcard border-none w-full" src="https://hatenablog-parts.com/embed?url=https://www.canva.com/design/DAHI-amzUYs/iWurz9nUscJssWTecCputA/edit" height="155"></iframe>

「ああ」をF8キーで半角カタカナ変換すると、本来は「ｱｱ」になってほしいのに、「あｱ」や「ああｱｱ」になってしまう。聞いただけで嫌な予感しかしないタイプの不具合で、実際かなり厄介そうだった。

最終的には、IMEやブラウザ側の挙動に起因するため、ワークアラウンドで対応するしかない、という結論。
「そもそも半角カタカナを使うべきではない」というのはその通りだと思いつつ、全銀システムのような歴史ある仕様が存在する限り、こういう問題は簡単には消えないのだろうなとも感じた。

結論はともかく、特に良かったのは、そこに至るまでの仮説と検証のプロセス。
現象を丁寧に切り分けながら原因を追っていく流れが非常にわかりやすく、聞いていて引き込まれた。

あと、内容はもちろん、トーク自体も軽快でとても聞きやすかった。
スライドも要点が整理されていて、発表として完成度が高かった。


### 「小さいVue.js」を30分でつくる

<iframe class="hatenablogcard border-none w-full" src="https://hatenablog-parts.com/embed?url=https://speakerdeck.com/hal_spidernight/xiao-saivue-dot-jswo30fen-dezuo-ru" height="155"></iframe>

まさかカンファレンスでハンズオン形式のセッションをやるとは思っていなかったので、かなり新鮮だった。

`Vue`は昔少し触った程度だったので、内部の仕組みを追いながら実装していく内容はとても勉強になった。
特に、`chibivue`のように、小さく実装しながらフレームワークを理解するアプローチがあるのは知らなかった。

実際に手を動かしながら見ることで、「Vueがどう動いているのか」がかなり解像度高く理解できた気がする。

聞きながら、「これ`Angular`版の`chibiangular`を作ったら面白そうだな」とずっと考えていた。


### 「いつか誰かが」と思っていた——フロントエンド刷新5年間の実践知

<iframe class="hatenablogcard border-none w-full" src="https://hatenablog-parts.com/embed?url=https://speakerdeck.com/kiichisugihara/itukashui-kaga-tosi-tuteita-hurontoendoshua-xin-5nian-jian-noshi-jian-zhi" height="155"></iframe>

「時間の使い方が、未来を決める」。経験談といっしょに聞くと、重みが違った。

日々のメインタスクに追われていると、リアーキテクチャやリファクタリングに手を付ける余裕なんて本当にない。
「必要だと分かっているのに進まない」という感覚にはすごく共感した。

その中で、「あえて残業を減らし、業務時間外に取り組んだ」という話は意外だった。
本来は勉強やリファクタリングも業務として扱えるのが理想だと思う一方で、思い切って切り離した方が、逆にコンテキストスイッチがしやすく、集中して進められるというのは確かにあるのかもしれない。

理想論だけではなく、「現実の制約の中でどう前に進めるか」という実践的な話として、とても考えさせられる内容だった。


## スポンサーブース

ミニゲームで遊べたり、ノベルティを配っていたりと楽しかった。

chotさんのブースでは、利用しているフロントエンドフレームワークのアンケートを取っていた。
結果はだいたい予想通り。`Angular`に5人もいてちょっと嬉しくなった。これ毎回やってほしい。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Angularの一人目は私です<a href="https://twitter.com/hashtag/fec_nagoya?src=hash&amp;ref_src=twsrc%5Etfw">#fec_nagoya</a> <a href="https://t.co/0M5G3pi9uP">pic.twitter.com/0M5G3pi9uP</a></p>&mdash; nishitaku@フリーランスエンジニア (@nishitaku_dev) <a href="https://twitter.com/nishitaku_dev/status/2053006713385853303?ref_src=twsrc%5Etfw">May 9, 2026</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


## 最後に

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">ありがとうございました、楽しかったです。北海道まで残り一カ月、今日のに負けないぐらい、いい登壇ができるよう、しっかり準備します！<br><br>なお、子どもから一番人気のノベルティはココロザシさんのこちらでした。<a href="https://twitter.com/hashtag/fec_nagoya?src=hash&amp;ref_src=twsrc%5Etfw">#fec_nagoya</a> <a href="https://t.co/j6dp0QLdqJ">pic.twitter.com/j6dp0QLdqJ</a></p>&mdash; nishitaku@フリーランスエンジニア (@nishitaku_dev) <a href="https://twitter.com/nishitaku_dev/status/2053065767231574521?ref_src=twsrc%5Etfw">May 9, 2026</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>