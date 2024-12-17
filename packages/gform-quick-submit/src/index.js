"use server";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const GFromQuickSubmitFormPOST = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const form_url = data.formUrl || process.env.GFORM_QUICK_SUBMIT_FORM_URL;
        if (!form_url) {
            throw new Error("Form URL is not defined in environment variables.");
        }
        // URLSearchParamsを使用してフォームのデータを準備
        const query = new URLSearchParams();
        // data配列をループして、エントリーIDに対応するフォームのデータを追加
        data.data.map((item) => {
            query.append(`entry.${item.key}`, `${item.value}`);
        });
        // フォームにデータを送信
        const response = yield fetch(`${form_url}/formResponse`, {
            method: "POST",
            body: query.toString(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (!response.ok) {
            throw new Error("Failed to submit the form.");
        }
        return { success: true };
    }
    catch (error) {
        console.error("Form submission error:", error);
        return { success: false, error };
    }
});
export { GFromQuickSubmitFormPOST };
