---
sidebar_position: 4
---

# フォーム送信関数の作成

作成途中の送信関数の制作をします。送信は `GFromQuickSubmitFormPOST` 関数にデータを渡し実行することで完了します。

`GFromQuickSubmitFormPOST` は `formUrl`, `data` を設定可能です。`formUrl` はフォームの URL を設定することが出来ますが、`env` でデフォルトを設定しているため設定する必要はありません。`data` はフォームの情報です。`key` と `valeu` を設定する必要があり、この対応するキーは前回のステップで取得していると思います。対応するキーに適切なデータを渡す様に設定してください。

:::note

Google フォームが予期せずエラーを返す場合、setFormError で返却されたエラー内容をコンソールで確認すると問題の原因を特定しやすくなります。

:::

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

## 実際に送信してみる

これでチュートリアルは完成です。ブラウザで [http://localhost:3000](http://localhost:3000) を開き、フォームが正しく表示されていることを確認してください。

```bash
npm run dev
```

![demo form](https://github.com/user-attachments/assets/c1ab43b7-0c25-47a5-a7bf-c08896d4d829)

このチュートリアルのソースコードは[こちら](https://github.com/toakiryu/gform-quick-submit/tree/main/templates/nextjs-tutorial)にあります。
