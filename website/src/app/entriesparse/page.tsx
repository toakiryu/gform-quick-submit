"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import {
  CodePreview,
  CodePreviewCard,
  CodePreviewCardBody,
  CodePreviewCardLabel,
} from "@/components/ui/codecontent";
import { useTranslations } from "next-intl";

type FormData = {
  googleFormUrl: string;
};

const Page = () => {
  const t = useTranslations("pages.entriesparse");
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<
    { id: string; label: string }[] | null
  >(null);

  const formSchema = z.object({
    googleFormUrl: z
      .string()
      .url(t("error.urlInvalid"))
      .regex(
        /https:\/\/docs\.google\.com\/forms\/d\/e\/\S+\/viewform/,
        t("error.googleFormUrl")
      ),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const fetchFormData = async (url: string) => {
    try {
      const response = await fetch(
        `/api/parse-form?url=${encodeURIComponent(url)}`
      );
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error(t("error.fetchFailed"), error);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsFormLoading(true);
    await fetchFormData(data.googleFormUrl);
    setIsFormLoading(false);
  };

  const generateCodeString = () => {
    if (!formData) return "";
    const dataEntries = formData
      .map(({ id }) => `    { key: "${id}", value: "" }`)
      .join(",\n");

    return `await GFromQuickSubmitFormPOST({
  data: [
${dataEntries}
  ],
});`;
  };

  return (
    <div className="flex flex-col w-full h-full min-h-dvh">
      <div className="container max-w-5xl mt-24 mb-5 p-5">
        <div className="mb-24">
          <h1 className="font-bold text-2xl sm:!text-3xl md:!text-4xl text-center">
            {t("title")}
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="pb-5">
            <Input
              id="googleFormUrl"
              type="text"
              isInvalid={!!errors.googleFormUrl?.message}
              errorMessage={errors.googleFormUrl?.message}
              placeholder={t("placeholder")}
              {...register("googleFormUrl")}
            />
          </div>

          <Button
            type="submit"
            isLoading={isFormLoading}
            className="bg-blue-500 text-white py-2 px-3 shadow-md rounded-md hover:bg-blue-600 active:scale-95 transition-all duration-300 ease-in-out"
          >
            {t("submitButton")}
          </Button>
        </form>
        {formData && (
          <div className="mt-10">
            <div className="border-b mb-3">
              <h2>{t("resultsTitle")}</h2>
            </div>
            <Table selectionMode="single">
              <TableHeader>
                <TableColumn>{t("table.label")}</TableColumn>
                <TableColumn>{t("table.id")}</TableColumn>
              </TableHeader>
              <TableBody>
                {formData.map((entry: { id: string; label: string }) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.label}</TableCell>
                    <TableCell>{entry.id}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <CodePreviewCard className="mt-5">
              <CodePreviewCardLabel>
                {t("codePreviewLabel")}
              </CodePreviewCardLabel>
              <CodePreviewCardBody>
                <CodePreview showCopyButton code={generateCodeString()} />
              </CodePreviewCardBody>
            </CodePreviewCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
