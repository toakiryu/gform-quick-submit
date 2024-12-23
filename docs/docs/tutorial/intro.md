---
sidebar_position: 1
---

# 初めに

このチュートリアルは [Next.js](https://nextjs.org/) を使用して、基本的なお問い合わせフォームを作成します。

新しいサイトを作成して始めましょう。

このチュートリアルのソースコードは[こちら](https://github.com/toakiryu/gform-quick-submit/tree/main/templates/nextjs-tutorial)にあります。

## 新しいサイトを作成

`create-next-app` すべてを自動的に設定する を使用して新しい Next.js アプリを開始することをお勧めします。プロジェクトを作成するには、次のコマンドを実行します。

```bash
npx create-next-app@latest
```

インストール時に、次のプロンプトが表示されます。

```bash
What is your project named? my-app
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like your code inside a `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to use Turbopack for `next dev`?  No / Yes
Would you like to customize the import alias (`@/*` by default)? No / Yes
What import alias would you like configured? @/*
```

プロンプトの後、`create-next-app` プロジェクト名のフォルダーが作成され、必要な依存関係がインストールされます。

## サイトを始める

開発サーバーを実行します。

```bash
cd my-app
npm run dev
```

この `cd` コマンドは、作業中のディレクトリを変更します。新しく作成した Next.js サイトを操作するには、ターミナルをそこへ移動する必要があります。

この `npm run dev` コマンドは、Web サイトをローカルに構築し、開発サーバーを通じて提供して、`http://localhost:3000` で表示できるようにします。

## Google フォームの準備

:::note

作成した Google フォームが公開状態になっていない場合、送信が失敗する可能性があります。フォームの「設定」メニューで、回答者に Google アカウントのログインを求めない設定を確認してください。

:::

フォームを準備してください。まだフォームがない場合は新規フォームを作成してください。今回のチュートリアルは以下の画像のフォームを使用して進めていきます。

![GForm Quick Submit Template Form](https://github.com/user-attachments/assets/c4509126-5da2-44b3-9886-2d9dc06e55d7)
