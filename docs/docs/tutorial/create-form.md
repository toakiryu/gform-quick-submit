---
sidebar_position: 2
---

# フォームの作成

今回は、React Hook Form, Zod を使用してお問い合わせフォームを作成します。

フォームの作成について詳しく知りたい場合は、[react-hook-form](https://react-hook-form.com/) のドキュメントを参照してください。このチュートリアルでは、次のコードをルート ページ ファイルに貼り付けます。`onSubmit` 関数は現時点では空ですが、次の手順で完成します。

```tsx
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
