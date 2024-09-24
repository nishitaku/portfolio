---
title: |
  アクセシビリティカンファレンス名古屋に参加してきた #nagoya_a11yconf
pubDate: 2024-09-24T00:38:46.721Z
heroImage: accessibility-conference-in-nagoya.png
---

9/7(土)に開催された「アクセシビリティカンファレンス名古屋」にオフライン参加したので、雑にまとめる。

<iframe class="hatenablogcard border-none w-full" src="https://hatenablog-parts.com/embed?url=https://nagoya.a11yconf.net/" height="155"></iframe>


## きっかけ

1年ほど前から開発のお手伝いをしているSaaSが、アクセシビリティを意識したデザインシステムになっていて、ちょっと勉強したいと思ったので。


## 意思疎通支援システムYYSystem

株式会社アイシンの開発している「YYSystem」という音声認識システムの紹介。アイシンは車の部品メーカーのイメージだったので、意外だった。

セッション中は、登壇者の声をリアルタイムに文字起こししていて、かなり精度が高かった。また、声だけでなく、会場の拍手、笑い声といったオノマトペや、インターホンの音や緊急車両のサイレン音などの環境音も認識、可視化する仕組みになっていた。話者の識別もできるらしいが、精度は不明。

**インクルーシブデザイン**という言葉は初めて聞いたので、勉強になった。マイノリティをターゲットにする考え方なので、ビジネスとしては難しい。ただ、今後高齢化が進む社会では、マジョリティなり得るので、準備しておくことが大事。さらに、社会と個人の両方からのアプローチがあって、例えば、車椅子の人が階段を登れずに困っているケースだと、階段をスロープに変えるのが前者、車椅子が階段を登れるよう改良するのが後者。


## 誰もが親しみやすい色使いへ カラーパレットのアクセシビリティ改善の流れ

[株式会社エスケイワード](https://www.skword.co.jp/)のスポンサーセッション。日本語上手だった。

既存のアプリケーションの配色を、WCAG 2.2(適合レベルAA)に準拠したコントラスト比の配色に修正する話。

コントラスト比を確認したりするのに便利そうなツール
- Adobe Color
- Stark - Contrast & Accessibility Checker (Figma Plugin)
- [Tanaguru contrast finder](https://contrast-finder.tanaguru.com/)

デザインシステムを構築するときに、コントラスト比も意識しようね、という学び。


## 受託制作ウェブアクセシビリティ現場最前線

[株式会社トルク](https://trq.co.jp/)という、アクセシビリティに力をいれてる受託Web制作会社のセッション。

最近手掛けた[SmartHRの採用サイト](https://recruit.smarthr.co.jp/)を見ながら、アクセシビリティを向上させる具体的なテクニックの解説。

例えば、動きのあるサイトでは、それを停止するためのボタンを設定する必要がある。上記サイトの場合、ヘッダーに「モーションボタン」を設定して、サイト全体の動きを制御していた。画像だけでなく、ボタンのアニメーションも停止させていて、すごい手間をかけてるなと感じた。そこまでして動きをつけることに何の意味があるんだろうか。

アクセシビリティ対応では、セオリーはあるが文脈による、という話が印象的だった。サイト全体で意図をもって設計、実装することが大事。

こちらの会社はアクセシビリティに配慮したデザインのサイトを集めたギャラリーも運営している。

<iframe class="hatenablogcard border-none w-full" src="https://hatenablog-parts.com/embed?url=https://www.aaa11y.com/" height="155"></iframe>

なお、レベルAAAのサイトが1つもないのは、こちらが理由らしい。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">AAA11YにAAAのサイトがひとつもないのは、WCAGではAAAを適合要件にするのが推奨されてないからです、というのを補足したい<a href="https://t.co/w29aoxWlGG">https://t.co/w29aoxWlGG</a><br><br> <a href="https://twitter.com/hashtag/nagoya_a11yconf?src=hash&amp;ref_src=twsrc%5Etfw">#nagoya_a11yconf</a></p>&mdash; Rikiya Ihara / magi (@magi1125) <a href="https://twitter.com/magi1125/status/1832309830536851797?ref_src=twsrc%5Etfw">September 7, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


## 「人にやさしい情報発信」をめざして～花王の4年間のウェブアクセシビリティの道のり～

シャンプーや洗剤でおなじみ、花王グループ。
2020年から全700サイトのWebアクセシビリティ対応をスタートさせて、地道に改善している。

目をつぶっていてもリンスとシャンプーを区別できるように、シャンプーの容器にだけギザギザの「きざみ」がついてるのは、花王が始まり、というトリビア。
これもアクセシビリティの一貫で、花王グループはアクセシビリティが全社的に認知されている会社。それでも、これほど大きな会社だと社内政治があって、中々一筋縄ではいかない。

海外では訴訟リスクもあるので、海外展開しているサイトは特に重要になる。


## 社内を動かすアクセシビリティ戦略

株式会社Qiitaのスポンサーセッション。

<iframe class="hatenablogcard border-none w-full" src="https://hatenablog-parts.com/embed?url=https://blog.qiita.com/accessibility-project/" height="155"></iframe>

組織的に取り組む場合、開発者の協力を得るには「アクセシビリティを意識して実装する」ではなく、「セマンティックなマークアップにしていく」のような具体的な目標設定が効果的。


## アクセシビリティでキャリアを築く

Webアクセシビリティでキャリアを積んできた、業界で著名なお二方によるパネルディスカッション。

アクセシビリティに限らず、企業の中で自分がやりたいことをするために、どうやって周りを巻き込んでいくか。とくにアクセシビリティは数値が可視化されにくいので難しい。正しいからやる、では説得力がない。ユーザーメリット、事業メリットを丁寧に説明することが大切。あえて「アクセシビリティ」という言葉を使わずに説明するのも手、というのはQiitaと同じ。

アクセシビリティの仕事を受注したいなら、ハッタリも大事。肩書きから始めるのもあり。


## 懇親会

福岡や北海道から来てる人がいて、Web業界でのアクセシビリティへの関心の高まりを感じた。


## まとめ

[WCAG 2.2](https://waic.jp/translations/WCAG22/) を読む。

このサイトも勉強になる。

<iframe class="hatenablogcard border-none w-full" src="https://hatenablog-parts.com/embed?url=https://porta11y.d-zero.co.jp/" height="155"></iframe>


アクセシビリティ ✕ フロントエンドエンジニア、というブランディングもよさそう。

11末に、[アクセシビリティカンファレンス福岡2024](https://fukuoka-a11yconf.connpass.com/event/322934/)があるので、オンラインで参加したい。
