import { Metadata } from "next";
import { SampleForm } from "@/components/pages/sample/form";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const t = await getTranslations({ lang, namespace: "pages.demo.metadata" });
  return {
    title: t("title"),
  };
}

export default function DemoPage() {
  return (
    <div className="flex justify-center items-center w-full h-full min-h-dvh">
      <SampleForm formUrl={process.env.GFORM_QUICK_SUBMIT_FORM_URL} />
    </div>
  );
}
