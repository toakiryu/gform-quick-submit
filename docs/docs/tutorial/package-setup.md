---
sidebar_position: 3
---

# パッケージの設定

## フォーム ID の取得

Google フォームにデータを送信するには、まず `gform-quick-submit` パッケージを構成する必要があります。設定方法は 2 つあります。

### フォームの編集ページの URL から取得する

1. Google フォームの編集ページを開く

URL: `https://docs.google.com/forms/d/1FAIpQLSfEXAMPLE/edit` では、フォーム ID は `1FAIpQLSfEXAMPLE` です。

### フォームの回答ページの URL から取得する

1. Google フォームを開く

例: `https://docs.google.com/forms/d/e/1FAIpQLSfEXAMPLE/viewform` では、フォーム ID は `1FAIpQLSfEXAMPLE` です。

## フォーム ID を設定する

プロジェクトルートに `env.local` ファイルを作成し、`GFORM_QUICK_SUBMIT_FORM_URL` キーを作成してください。

値は `https://docs.google.com/forms/d/e/<フォームID>` です。

もしフォーム ID が`1FAIpQLSfEXAMPLE`の場合、`https://docs.google.com/forms/d/e/1FAIpQLSfEXAMPLE` となります。

```env
GFORM_QUICK_SUBMIT_FORM_URL=https://docs.google.com/forms/d/e/***********
```

## エントリー ID の取得

Google フォームの各フィールドには、一意の `エントリ ID` が割り当てられます。この ID は、フォーム フィールドを `gform-quick-submit` で使用されるデータに正しくマッピングするために必要です。

:::warning

エントリー ID は、Google フォーム内の各入力項目に割り振られた一意の識別子です。この識別子が正しく設定されていない場合、フォーム送信が正常に動作しない可能性があります。

:::

エントリ ID を取得するプロセスを簡素化するには、次の手順に従います。

### エントリ ID 検出ツールを使用する

1. [エントリ ID 検出ツール](https://gform-quick-submit.toakiryu.com/entriesparse) にアクセスします。

2. Google フォームの URL を入力し、[フォームを解析] ボタンをクリックします。

3. ツールに、フィールド名とそれに対応するエントリ ID のリストが表示されます。

4. これらのエントリ ID をコピーして、設定で使用します。

:::note

ツールが機能しない場合は、ネットワーク タブを検査するための手動の方法を参照してください (詳細は近日公開)。

:::
