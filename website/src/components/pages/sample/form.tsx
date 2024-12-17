"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Form,
  Input,
  Link,
  Textarea,
} from "@nextui-org/react";
import { GFromQuickSubmitFormPOST } from "gform-quick-submit";

export function SampleForm({ formUrl }: { formUrl?: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formState, setFormState] = useState<boolean>(false);
  const [formSuccess, setFormSuccess] = useState<boolean>(false);
  const [formError, setFormError] = useState<unknown | undefined>(undefined);

  const t = useTranslations("pages.sample.form");

  const contactSchema = z.object({
    company: z.string().optional(),
    name: z.string().min(1, t("errors.nameRequired")),
    email: z.string().email(t("errors.emailInvalid")),
    message: z.string().min(1, t("errors.messageRequired")),
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
    setIsLoading(true);
    const res = await GFromQuickSubmitFormPOST({
      data: [
        { key: "1037971436", value: data.company },
        { key: "64248411", value: data.name },
        { key: "1959211618", value: data.email },
        { key: "272465746", value: data.message },
      ],
    });
    setFormState(true);
    setFormSuccess(res.success);
    setFormError(res.error);
    setIsLoading(false);
  };

  const onPressNewForm = () => {
    reset();
    setFormState(false);
    setFormSuccess(false);
    setFormError(undefined);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
      {formState && formSuccess ? (
        <Card>
          <CardHeader>
            <Link
              isExternal
              showAnchorIcon
              href={`${formUrl}/viewform?usp=dialog`}
            >
              <h1 className="font-bold text-xl">{t("title")}</h1>
            </Link>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col gap-4 w-full">
              <Link
                href={`${formUrl}/viewanalytics`}
                isExternal
                showAnchorIcon
                className="text-blue-500"
              >
                {t("viewAnswerDetails")}
              </Link>
            </div>
          </CardBody>
          <Divider />
          <CardFooter>
            <div className="flex flex-col">
              <div className="flex gap-2">
                <Button color="primary" onPress={onPressNewForm}>
                  {t("newFormButton")}
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <Link
                isExternal
                showAnchorIcon
                href={`${formUrl}/viewform?usp=dialog`}
              >
                <h1 className="font-bold text-xl">{t("title")}</h1>
              </Link>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col gap-4 w-full">
                <Input
                  id="company"
                  type="text"
                  label={t("fields.company")}
                  labelPlacement="outside"
                  placeholder=" "
                  {...register("company")}
                />
                <Input
                  id="name"
                  type="text"
                  label={t("fields.name")}
                  labelPlacement="outside"
                  placeholder={t("fields.name-placeholder")}
                  isRequired
                  isInvalid={!!errors.name?.message}
                  errorMessage={errors.name?.message}
                  {...register("name")}
                />
                <Input
                  id="email"
                  type="email"
                  label={t("fields.email")}
                  labelPlacement="outside"
                  defaultValue="example@gmail.com"
                  placeholder="example@gmail.com"
                  isRequired
                  isInvalid={!!errors.email?.message}
                  errorMessage={errors.email?.message}
                  {...register("email")}
                />
                <Textarea
                  id="message"
                  type="text"
                  disableAnimation
                  disableAutosize
                  label={t("fields.message")}
                  labelPlacement="outside"
                  placeholder={t("fields.message-placeholder")}
                  isRequired
                  isInvalid={!!errors.message?.message}
                  errorMessage={errors.message?.message}
                  classNames={{
                    base: "max-w-xs",
                    input: "resize-y min-h-[40px]",
                  }}
                  {...register("message")}
                />
              </div>
              <div className="mt-3">
                <Alert color="warning" title={t("alert.stop-1")} />
              </div>
            </CardBody>
            <Divider />
            <CardFooter>
              <div className="flex flex-col">
                {formState && (
                  <div className="mb-3">
                    <Alert
                      color={formSuccess ? "success" : "danger"}
                      title={
                        formSuccess ? t("success.title") : t("error.title")
                      }
                      description={
                        formSuccess ? t("success.description") : formError
                      }
                    />
                  </div>
                )}
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    color="primary"
                    isLoading={isSubmitting || isLoading}
                  >
                    {isSubmitting ? t("loadingButton") : t("submitButton")}
                  </Button>
                  <Button
                    type="reset"
                    variant="flat"
                    onPress={() => reset()}
                    isDisabled={isSubmitting || isLoading}
                  >
                    {t("resetButton")}
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </Form>
      )}
    </div>
  );
}
