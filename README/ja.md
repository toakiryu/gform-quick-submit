# GForm Quick Submit Wiki

フォームにデータを素早く送信できるパッケージです。このツールを使えば、お問い合わせフォームなどを簡単にウェブサイトに統合できます。無料で Google フォームを利用可能なので、初心者の方にも最適です。

最新のドキュメントについては、[公式Wiki](https://gform-quick-submit-docs.vercel.app/)を参照してください。

**注意**

> Google フォームには送信数に制限があるため、大規模な商業用途には適していません。

# チュートリアル

このチュートリアルは基本的なお問い合わせフォームを作成します。

- [Google フォームを作成](#1-Googleフォームを作成)
- [入力フォームを作成](#2-入力フォームを作成)
- [パッケージの設定と解説](#3-パッケージの設定と解説)
  - [フォームの回答ページの URL から設定する](#フォームの回答ページのURLから設定する)
  - [フォーム ID から設定する](#フォームIDから設定する)
- [エントリー ID の取得](#4-エントリーIDの取得)
- [フォームの送信関数を設定する](#5-フォームの送信関数を設定する)
- [実際に送信してみる](#6-実際に送信してみる)

## 1. Google フォームを作成

まずは、フォームを準備してください。まだフォームがない場合は新規フォームを作成してください。今回のチュートリアルは以下の画像のフォームを使用して進めていきます。

**注意**

> 作成した Google フォームが公開状態になっていない場合、送信が失敗する可能性があります。フォームの「設定」メニューで、回答者に Google アカウントのログインを求めない設定を確認してください。

![GForm Quick Submit Template Form](https://github.com/user-attachments/assets/c4509126-5da2-44b3-9886-2d9dc06e55d7)

## 2. 入力フォームを作成

### セットアップとパッケージのインストール

```bash
npx create-next-app@latest nextjs-tutorial
```

```bash
npm i zod react-hook-form @hookform/resolvers gform-quick-submit
```

### フォームの作成

フォームの作り方などを知りたい場合は [react-hook-form](https://react-hook-form.com/) などのドキュメントを検索してください。今回のチュートリアルでは以下のコードをルートページのファイルに貼り付けてください。以下のコードでは `onSubmit` 関数の中身がなにもありませんが、次のステップで作成します。

```page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GFromQuickSubmitFormPOST } from "gform-quick-submit";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formState, setFormState] = useState<boolean>(false);
  const [formError, setFormError] = useState<unknown | undefined>(undefined);

  const contactSchema = z.object({
    company: z.string().optional(),
    name: z.string().min(1, "名前を入力してください"),
    email: z.string().email("有効なメールアドレスを入力してください"),
    message: z.string().min(1, "メッセージを入力してください"),
  });

  type ContactFormValues = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
  };

  return (
    <div className="flex justify-center items-center w-full h-full min-h-dvh">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container max-w-sm p-5 rounded-2xl border border-neutral-800 bg-neutral-900 shadow-lg"
      >
        <div>
          <div className="mb-5">
            <h1 className="font-bold text-xl">お問い合わせ</h1>
          </div>
          {formState ? (
            <div>フォームを送信しました。</div>
          ) : (
            <>
              <div className="flex flex-col gap-4 w-full">
                <label htmlFor="company">
                  <h2 className="mb-2">会社名</h2>
                  <input
                    id="company"
                    type="text"
                    {...register("company")}
                    className="w-full py-1 px-2 bg-neutral-800 border border-neutral-700 rounded-lg"
                  />
                </label>
                <label htmlFor="name">
                  <h2 className="mb-2">名前*</h2>
                  <input
                    id="name"
                    type="text"
                    placeholder="ゲスト"
                    {...register("name")}
                    className={`w-full py-1 px-2 bg-neutral-800 border ${
                      errors.name?.message
                        ? "border-red-500"
                        : "border-neutral-700"
                    } rounded-lg`}
                  />
                  <p className="text-sm text-red-500 mt-2">
                    {errors.name?.message}
                  </p>
                </label>
                <label htmlFor="email">
                  <h2 className="mb-2">メールアドレス*</h2>
                  <input
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    {...register("email")}
                    className={`w-full py-1 px-2 bg-neutral-800 border ${
                      errors.email?.message
                        ? "border-red-500"
                        : "border-neutral-700"
                    } rounded-lg`}
                  />
                  <p className="text-sm text-red-500 mt-2">
                    {errors.email?.message}
                  </p>
                </label>
                <label htmlFor="message">
                  <h2 className="mb-2">メッセージ*</h2>
                  <textarea
                    id="message"
                    placeholder="こんにちは"
                    {...register("message")}
                    className={`w-full py-1 px-2 bg-neutral-800 border ${
                      errors.message?.message
                        ? "border-red-500"
                        : "border-neutral-700"
                    } rounded-lg`}
                  />
                  <p className="text-sm text-red-500 mt-2">
                    {errors.message?.message}
                  </p>
                </label>
              </div>
              <hr className="my-2 border-neutral-700" />
              <div>
                <div className="flex flex-col">
                  {formState && (
                    <div className="mb-3">
                      <p className="text-sm text-red-500">
                        {formError as string}
                      </p>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      color="primary"
                      disabled={isSubmitting || isLoading}
                      className="bg-white text-black min-w-16 py-1 px-2 border rounded-lg hover:opacity-80 active:scale-95 transition-all duration-300 ease-in-out"
                    >
                      {isSubmitting || isLoading ? "送信中..." : "送信"}
                    </button>
                    <button
                      type="reset"
                      onClick={() => reset()}
                      disabled={isSubmitting || isLoading}
                      className="bg-white/10 text-white min-w-16 py-1 px-2 border border-white/10 rounded-lg hover:opacity-80 active:scale-95 transition-all duration-300 ease-in-out"
                    >
                      リセット
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
```

## 3. パッケージの設定と解説

ステップ１で作成または準備している Google フォームの URL を `env` に設定します。以下のどちらかの方法でキーを設定してください。

### フォームの回答ページの URL から設定する

フォームを回答するページを開き URL をコピーしてください。URL は以下の様になっていることを確認し、`https://docs.google.com/forms/d/e/*******/viewform`

プロジェクトルートに .env.local ファイルを作成し、以下のように GFORM_QUICK_SUBMIT_FORM_URL を記述してください。この URL の末尾の /viewform を削除する点に注意してください。

### フォーム ID から設定する

フォームの編集ページを開き URL の、`https://docs.google.com/forms/d/`の次に来る文字列がフォーム ID です。その ID をコピーし、`https://docs.google.com/forms/d/e/`の後ろに貼り付けてください。

![SCR-20241218-bgls](https://github.com/user-attachments/assets/9c5747af-370b-4df0-8036-a55661fdfb72)

```env
GFORM_QUICK_SUBMIT_FORM_URL=https://docs.google.com/forms/d/e/***********
```

## 4. エントリー ID の取得

フォームを送信するために、Google フォームの入力項目のエントリー ID を全て取得するひつようがあります。[この解析ツール](https://gform-quick-submit.fun117.dev/entriesparse)を使って項目に対応するエントリー ID を調べてください。ツールにアクセスしたら、フォームの回答ページの URL を入力してください。解析をすると、下の方に解析結果が表示され、使用例が表示されます。検索結果は後ほど使うので、コピーするか、こちらのサイトは開いたままにしておいてください。

## 5. フォームの送信関数を設定する

ステップ 2 で作成途中の送信関数の制作をします。送信は `GFromQuickSubmitFormPOST` 関数にデータを渡し実行することで完了します。

`GFromQuickSubmitFormPOST` は `formUrl`, `data` を設定可能です。`formUrl` はフォームの URL を設定することが出来ますが、ステップ 3 で設定しているため設定する必要はありません。`data` はフォームの情報です。`key` と `valeu` を設定する必要があり、この対応するキーはステップ 4 で取得していると思います。対応するキーに適切なデータを渡す様に設定してください。

**補足**

> エントリー ID は、Google フォーム内の各入力項目に割り振られた一意の識別子です。この識別子が正しく設定されていない場合、フォーム送信が正常に動作しない可能性があります。

> Google フォームが予期せずエラーを返す場合、setFormError で返却されたエラー内容をコンソールで確認すると問題の原因を特定しやすくなります。

```tsx
const onSubmit = async (data: ContactFormValues) => {
  setIsLoading(true);
  const res = await GFromQuickSubmitFormPOST({
    data: [
      { key: "1037971436", value: data.company },
      { key: "64248411", value: data.name },
      { key: "1959211618", value: data.email },
      { key: "272465746", value: data.message },
    ],
  });
  if (res.success) {
    setFormState(true);
  } else {
    setFormError(res.error);
  }
  setIsLoading(false);
};
```

## 6. 実際に送信してみる

これでチュートリアルは完成です。ブラウザで [http://localhost:3000](http://localhost:3000) を開き、フォームが正しく表示されていることを確認してください。

```bash
npm run dev
```

![demo form](https://github.com/user-attachments/assets/c1ab43b7-0c25-47a5-a7bf-c08896d4d829)

---

これで Google フォームと `gform-quick-submit` を統合するための基本的なチュートリアルは終わりです。このセットアップを使えば、あなたのウェブサイトにフォームをすばやく追加できるようになります。

チュートリアルのソースコード: https://github.com/Fun117/gform-quick-submit/tree/main/templates/nextjs-tutorial
