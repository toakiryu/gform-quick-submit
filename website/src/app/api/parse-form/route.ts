import { NextRequest, NextResponse } from "next/server";

// 出力される項目の型
type GFromQuickSubmitFormEntryType = {
  id: string;
  label: string;
};

// 解析関数
async function GFromQuickSubmitFormEntriesParse(
  formUrl: string
): Promise<GFromQuickSubmitFormEntryType[]> {
  try {
    const response = await fetch(formUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch form HTML: ${response.statusText}`);
    }

    const html = await response.text();

    // `data-params`属性をマッチする正規表現
    const dataParamsPattern = /data-params="[^"]*"(?:[^>]*>)/g;

    const entries: GFromQuickSubmitFormEntryType[] = [];
    const dataParamsMatches = Array.from(html.matchAll(dataParamsPattern));

    // `data-params`からIDとラベルを抽出
    dataParamsMatches.forEach((match) => {
      const paramsString = match[0];

      // IDの抽出
      const idMatch = paramsString.match(/\[([0-9]+),null/);
      // ラベル名の抽出 (例: "会社 / Company")
      const labelMatch = paramsString.match(/,&quot;([^&]+)&quot;/);

      if (idMatch && labelMatch) {
        const id = idMatch[1];
        const label = labelMatch[1];
        entries.push({ id, label });
      }
    });

    return entries;
  } catch (error) {
    console.error("Failed to parse Google Form entries:", error);
    throw error;
  }
}

// APIエンドポイントの処理
export async function GET(req: NextRequest) {
  const url = req.url;
  const formUrl = new URL(url).searchParams.get("url");

  if (!formUrl) {
    return NextResponse.json(
      { error: "URL parameter is required" },
      { status: 400 }
    );
  }

  try {
    const entries = await GFromQuickSubmitFormEntriesParse(formUrl);
    return NextResponse.json(entries);
  } catch {
    return NextResponse.json(
      { error: "Failed to parse Google Form" },
      { status: 500 }
    );
  }
}
