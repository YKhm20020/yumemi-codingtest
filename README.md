# ゆめみさんコーディングテスト

本リポジトリは、ゆめみさんのフロントエンドコーディングテストの回答リポジトリです。
README には、以下のことを記載しています。

- 環境構築
- 開発時間
- 使用技術

## 環境構築

以下のコマンドを実行して、環境を構築できます。

```bash
git clone https://github.com/YKhm20020/yumemi-codingtest.git
cd yumemi-codingtest
deno install
deno run dev
```

## 開発時間

| 日付       | 作業内容                                | 時間                   |
| ---------- | --------------------------------------- | ---------------------- |
| 2024/12/18 | 環境構築（Next.js, Biome, TailwindCSS） | 1.5 時間 (17:00~18:30) |

### 1 日目、開発時間の詳細

環境構築メイン。[ticket-1](https://github.com/YKhm20020/yumemi-codingtest/pull/2) に詳細は記載。
時間が短いが、研究室サーバーが動かなくなったと報告があったので、その対応にあたるため、1.5 時間で作業終了。

## 使用技術

### フレームワーク

- Next.js 15.1.1
- React 19.0.0

### CSS ライブラリ

- TailwindCSS 4.0.0-beta.8

### 開発ツール

- Biome（リンター・フォーマッター）
- Vitest（テストフレームワーク）

### CI/CD

- GitHub Actions
  - Biome によるコード品質チェック

TODO として、Vercel でのデプロイも行う。
