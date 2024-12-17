export interface GFromQuickSubmitFormItemProps {
  key: string;
  value: string | undefined;
}

export interface GFromQuickSubmitFormPOSTProps {
  formUrl?: "default" | string;
  data: GFromQuickSubmitFormItemProps[];
}

export interface GFromQuickSubmitFormPOSTResponses {
  success: boolean;
  error?: undefined | unknown;
}

// 関数の型定義をここに記述
export declare const GFromQuickSubmitFormPOST: (
  data: GFromQuickSubmitFormPOSTProps
) => Promise<GFromQuickSubmitFormPOSTResponses>;
