# ゆめみさんコーディングテスト

本リポジトリは、ゆめみさんのフロントエンドコーディングテストの回答リポジトリです。

README には、以下のことを記載しています。

- 環境構築
- 開発時間
- 使用技術

# 環境構築

以下のコマンドを実行して、環境を構築できます。

```bash

git clone https://github.com/YKhm20020/yumemi-codingtest.git
cd yumemi-codingtest
deno install
deno task dev

```

# 開発時間

| 日付       | 作業内容                                                                                 | 作業時間                            | 除外時間 (休憩等)                       |
| ---------- | ---------------------------------------------------------------------------------------- | ----------------------------------- | --------------------------------------- |
| 2024/12/18 | 環境構築（Next.js, Biome, TailwindCSS）                                                  | 1.5 時間 (17:00~18:30)              | 0 時間                                  |
| 2024/12/19 | 環境構築の続き、グラフに必要なデータフェッチ関連                                         | 1.5 時間 (17:00~20:30)              | 1 時間 (サポーターズイベント参加のため) |
| 2024/12/20 | 1 日ゼミと忘年会でおやすみ                                                               | 0 時間                              | 0 時間                                  |
| 2024/12/21 | データフェッチとグラフの表示、チェックボックスコンポーネントの作成                       | 1.5 時間 (18:00~20:30)              | 0 時間                                  |
| 2024/12/22 | 体調不良のためおやすみ                                                                   | 0 時間                              | 0 時間                                  |
| 2024/12/23 | チェックボックスリストのコンポーネントを作成                                             | 1.5 時間 (21:00~23:00)              | 0.5 時間 (休憩)                         |
| 2024/12/24 | ダッシュボードのコンポーネントを仮作成、グラフ表示をチェックボックスのチェック状態と連携 | 1.5 時間 (13:00~15:00)              | 0 時間                                  |
| 2024/12/25 | データフェッチの最適化、チェックボックスコンポーネントの作成、人口種別変更機能の追加     | 4.5 時間 (14:00~15:00, 24:00~28:30) | 1.0 時間                                |
| 2024/12/26 | ヘッダーコンポーネントの作成、Vercel へのデプロイ                                        | 1.5 時間 (21:00~23:00)              | 0.5 時間                                |

## 作業内容の詳細

### 1 日目 (2024/12/18)

環境構築メイン。[ticket-1](https://github.com/YKhm20020/yumemi-codingtest/pull/2) に詳細は記載。

時間が短いが、研究室サーバーが動かなくなったと報告があったので、その対応にあたるため、1.5 時間で作業終了。

### 2 日目 (2024/12/19)

環境構築の続き。各パッケージを Deno で使えるように。採点していただく際に `npm install` で動かないと不便かもしれないので、package.json, package-lock.json は残しておく。動かないとわかったら諦めて消す予定。

という予定だったものの、HighCharts が Deno での npm パッケージインポートで動きそうにないので、しばらくは Node.js で動きをチェックして、戻せそうなら Deno に戻す方針に。
データフェッチで 500 番エラーが発生したので、ドキュメントにあるように一旦ストップ。どうにも動きが不安定なので、変に Deno で環境構築したのが良くなかったかも。

### 3 日目 (2024/12/20)

ゼミと忘年会のためおやすみ。午前中もまとまった時間が取れそうになかったので、1 日進めないことに。

### 4 日目 (2024/12/21)

- 都道府県名と prefCode 、人口を取得する関数をそれぞれ作成
- 作成したデータ取得関数から、グラフを表示するコンポーネントを作成
- ラベルを受け取る汎用的なチェックボックスコンポーネントのモックを作成

時間の割に結構進んだ。NEXT_PUBLIC の接頭辞付け忘れに気づくまでに時間がかかったのが痛かったが、気づいてからは意外とすんなりいけた。
チェックボックスのデータをグラフに渡さないといけないので、チェックボックスリストとグラフをまとめたコンポーネント (命名は未定。dashboard, display 等？)をさらに作らないといけないことがわかった。

せっかく tailwindcss を 4.0 Beta にしているので、コンフィグをいじってみたい。
と思ったら tailwind.config.ts が不要になっていたので、削除した。自動ソースコード検出により、対象のソースを content で指定する必要がなくなった。消した後でも tailwind が動いていることを確認。

後日、学部生向けに研究室についての説明を行うことになったので、必要資料作成のため 1.5 時間で終了。

### 5 日目 (2024/12/22)

体調不良のためおやすみ。今年初の風邪がこのタイミングなのが不幸だが、インフルエンザではなかったのでまだよしと考える。

### 6 日目 (2024/12/23)

- チェックボックスリストのコンポーネントのモックを作成
- データ取得の関数を、処理を仮作成していたページから、チェックボックスリストのコンポーネントへ移動
- 型定義等の細かな修正

チェックボックスリストの作成が主な作業内容。
チェックした都道府県の prefCode をどう管理しようか悩んでいたため、初回コミットまで時間がかかった。
当初に単純なオブジェクトで管理しようとしたところを、Set オブジェクトでの管理を思いついたのは個人的に嬉しかった。
今回の実装では、prefCode は順序関係ないかつ一意な数字であるため、適切だと考えた。

また、各コンポーネントについて命名が都道府県関連に依存していないかを確認。現時点では後の実装で変わりそうなところはそのままに、子孫コンポーネントについてはできる限り都道府県関連に依存しないように命名し、コンポーネントの汎用性を向上させた。

体調不良が少し尾を引いているが、明日は夕方に学部生への説明会に出席しないといけないので、それまでにある程度やっておきたい。

### 7 日目 (2024/12/24)

- ダッシュボードのコンポーネントを仮作成
- グラフの表示をチェックボックスのチェック状態と連携

チェックボックスリストとグラフをまとめたダッシュボードのコンポーネントを仮作成した。
データフェッチでチェック状態に応じてグラフの表示が変わるようになったため、おおよその完成が見えてきた。

人口データのデータフェッチに問題があることが判明した。
現在、チェック状態を管理するため prefCode をまとめた Set オブジェクトを監視し、変更を検知したら prefCode 1 つにつき 1 回のデータフェッチを行っている。
このため、チェックボックスのチェック状態が変わるたびに、チェック状態を変更した都道府県以外もデータフェッチが行われてしまい、データフェッチの回数が多くなってしまう。
できれば対処したいが、対応できる時間があるかを要検討。一応気づいているという考えを残しておく。

現在思いついているのは、prefCode だけではなく人口データも Set オブジェクトとして管理することで、prefCode との同期が取れていれば順不同ながらも対応関係を保つことができるので、チェック状態が変更した prefCode のみデータフェッチし、そのデータを Set オブジェクトに追加するといける？

折り返しにして、ようやくおおよその完成が見えてきた。前半は予期しない予定や体調不良で進捗が芳しくなかったが、作業時間(ここまでで 7.5 時間)で考えると、結構よさげ。
後半はなるべく頑張りたい。
今日は夕方に学部生への説明会があるため昼に作業。余力があれば、説明会後にまた時間を取りたい。

### 8 日目 (2024/12/25)

- データフェッチの最適化
- チェックボックスコンポーネントの作成
- 作成したチェックボックスコンポーネントを利用した、人口種別変更機能の追加

14:00-15:00 で作業。TA のため一時中断。24:00 から再開、28:30 で終了。
チェックボックスのチェック状態が変わるたびに、チェックがある全ての都道府県に対してデータを取得していた。(例えば、3 つチェックされてあり、4 つ目をチェックすると、4 回のデータ取得関数が呼び出されていた。)
これを解決するため、一度取得したデータはキャッシュ化。新たにチェックが入った都道府県を特定し、それがキャッシュにない場合のみデータを取得するように修正した。
これによって、データフェッチの回数が減ったとともに、過去に取得した人口データを再度表示する際にもデータ取得することなく、キャッシュからデータを引っ張ってくるように。
人口データは頻繁に更新されるものではないため、キャッシュを利用しても問題ないと判断した。

後半で、チェックボックスのコンポーネントを作成。汎用的なものとそれを利用した人口種別用の 2 つを作成し、後者をダッシュボードに配置。
人口種別変更時、前回選択した人口種別の人口データがキャッシュ・グラフ表示分ともに残っていたため、それぞれをリセットする処理を追加。
人口種別ごとにキャッシュを管理するのが理想だが、実装が難しいわりにさほど頻繁に利用する機能とも思えず、バグが発生しそうだったため、人口種別変更時はキャッシュをクリアする方向で実装。

あとはヘッダーを作成して、レイアウトを整えればメイン実装が終わり。テストに移る。
ヘッダーは他コンポーネントに影響がないため、ほぼメインの実装が完了と言える。キャッシュ機能は結構頑張れた。チェックポチポチでの耐久チェックを防げているのは嬉しい。
レイアウトについては、クリスマスや正月を意識して作成しようとしたが、グラフに表示する色と被ってしまう場合があるので、シンプルに白黒ベースがいいと現時点で判断している。

## 9 日目 (2024/12/26)

- ヘッダーコンポーネントの作成
- Vercel へのデプロイ

この日は特に難しい実装はなく、簡単なヘッダーコンポーネントを作製し、Vercel へのデプロイを行った。
ハッカソンで Vercel にデプロイした際に、リージョンが東京になっておらず遅延がすごいことになった経験を忘れず、リージョンを東京にしておいた。

# 使用技術

## フレームワーク

- Next.js 15.1.1
- React 19.0.0

## CSS ライブラリ

- TailwindCSS 4.0.0-beta.8

## 開発ツール

- Biome（リンター・フォーマッター）
- Vitest（テストフレームワーク）

## CI/CD

- Biome によるコード品質チェック

TODO として、Vercel でのデプロイも行う。

# AI を利用した箇所

- README.md のテンプレート作成

表を書く、技術をまとめる時間がかかると思ったので、テンプレートを作ってもらいました。
一部の言い回しや付け加え等の詳細を自分で書き直しました。

- deno の使用方法把握

deno をはじめて使うので、公式ドキュメントを参考にしつつパッケージ追加方法等を質問。
Highcharts をインストールしようとしたところ、README の記述から Deno ではなく Node.js を使って動いていることがわかった。
パッケージを入れ直し、サーバー起動や Biome によるフォーマットチェックコマンドを追加し直しました。
`deno add` コマンドでパッケージをインストールしたため、Deno で動いていると思っていたのですが、deno.json がなく、package.json があったため、package.json 側にパッケージが追加されていたのが原因でした。

- HighCharts の使用方法把握

HighCharts もはじめて使うので、公式ドキュメントと Github の public になっているリポジトリを回りつつ、グラフ表示のコードも生成してもらった。

一部設定不要なオプションが入っていたので、そこを削除するとほぼ動く状態に。
データフェッチで総人口のみを取得しグラフで表示するようになっていたため、それを年少人口などの対応し、ラベルを動的に変更できるように自分で修正し、完成させた。

- useRef による人口データのキャッシュ管理

新たにチェックボックスが入ったデータを判定するためと、一度取得したデータの再取得を防ぐため、useRef を用いてキャッシュ管理を行った。
useRef でのキャッシュ化は思いついたものの、具体的な実装には悩んでいたため、コード生成を利用して実装。

現在のコードと要望だけでゼロから出力させようしたとき、チェックを外した都道府県のデータがグラフに表示されたままになってしまう不具合や、チェック状態を複数入れ替えると別の都道府県のデータが反映され、複数のデータが一致して表示されてしまう不具合が発生していた。

効率が悪いと判断したので、useRef でチェックが入った都道府県の人口データを変数に入れ、新しくチェックが入っている都道府県の特定までを自力で実装。
その後、それを利用してキャッシュ化した人口データを確認し、キャッシュにない場合のみデータ取得するようにコード生成を指示したところ、簡単に実装できた。
コードが長く複雑になってしまったが、キャッシュを利用してデータ取得の回数を減らすことができた。
