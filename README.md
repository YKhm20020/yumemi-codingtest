# ゆめみさんコーディングテスト

本リポジトリは、ゆめみさんのフロントエンドコーディングテストの回答リポジトリである。

課題：都道府県別の総人口推移グラフを表示する SPA(Single Page Application)を構築せよ

課題の詳細は[こちら](https://yumemi.notion.site/0e9ef27b55704d7882aab55cc86c999d)

README には、以下のことを記載している。

- デプロイ先
- 動作環境
- 使用技術
- 環境構築

# 本 Web アプリケーションについて

本 Web アプリケーションは、ドロップダウンリストで選択した人口種別と、チェックボックスで選択した都道府県の人口推移を折れ線グラフで表示するアプリケーションである。

グラフの点をマウスでホバーすると、年度とその年度の人口を表示できる。

人口種別は、取得する人口データの種類であり、以下の 4 つから選択できる。

- 総人口
- 年少人口
- 生産年齢人口
- 老年人口

なお、年少人口、生産年齢人口、老年人口については、マウスホバー時にその年度の総人口に対して占める割合を追加で表示する。

都道府県は、47 都道府県から複数選択できる。チェックボックスにチェックを入れた数だけ、人口推移を示す折れ線を表示する。

# デプロイ先

以下の URL でデプロイ先にアクセスできる。

https://yumemi-codingtest.vercel.app/

# 動作環境

以下の環境で動作を確認した。

- Chrome 131.0
- Safari 18.1.1
- Firefox 133.0.3

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

- Vercel での継続的デプロイ
- Biome によるコードチェック

# 環境構築

以下のコマンドを実行して、環境を構築できる。

```bash

git clone https://github.com/YKhm20020/yumemi-codingtest.git
cd yumemi-codingtest
npm install
npm run dev

```

[作業内容の詳細](https://github.com/YKhm20020/yumemi-codingtest/wiki/%E4%BD%9C%E6%A5%AD%E5%86%85%E5%AE%B9%E3%81%AE%E8%A9%B3%E7%B4%B0)、[生成 AI を利用した箇所](https://github.com/YKhm20020/yumemi-codingtest/wiki/%E7%94%9F%E6%88%90AI-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%97%E3%81%9F%E7%AE%87%E6%89%80)、[開発時間](https://github.com/YKhm20020/yumemi-codingtest/wiki/%E9%96%8B%E7%99%BA%E6%99%82%E9%96%93)については、かなり長くなったため Wiki に記述。
