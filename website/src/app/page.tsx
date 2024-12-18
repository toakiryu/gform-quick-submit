"use client";

import { Button, Link } from "@nextui-org/react";
import {
  Book,
  BookText,
  CirclePlay,
  Download,
  Github,
  SearchCheck,
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("pages.home");
  return (
    <div className="flex flex-col justify-center items-center w-full h-full min-h-dvh">
      <div className="container max-w-5xl mt-10 mb-5 p-5">
        <div className="flex flex-col md:!flex-row justify-center items-center">
          <BookText className="size-16 sm:!size-20 md:!size-28 lg:!size-36 mb-10 md:!mb-0 md:!mr-16" />
          <div className="flex flex-col sm:!w-2/3 md:!w-1/2 text-center md:!text-left">
            <h1 className="font-bold text-2xl sm:!text-3xl md:!text-4xl lg:!text-5xl">
              {t("metadata.title")}
            </h1>
            <p className="mt-5">{t("metadata.description")}</p>
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <Link href="/demo" target="_blank">
                <Button variant="ghost">
                  <CirclePlay className="w-5" />
                  <span>{t("buttons.demo")}</span>
                </Button>
              </Link>
              <Link href="/entriesparse" target="_blank">
                <Button variant="ghost">
                  <SearchCheck className="w-5" />
                  <span>{t("buttons.parse_tool")}</span>
                </Button>
              </Link>
              <Link
                href="https://www.npmjs.com/package/gform-quick-submit"
                target="_blank"
              >
                <Button variant="ghost">
                  <Download className="w-5" />
                  <span>{t("buttons.install")}</span>
                </Button>
              </Link>
              <Link
                href="https://github.com/toakiryu/gform-quick-submit/wiki"
                target="_blank"
              >
                <Button variant="ghost">
                  <Book className="w-5" />
                  <span>{t("buttons.document")}</span>
                </Button>
              </Link>
              <Link
                href="https://github.com/toakiryu/gform-quick-submit"
                target="_blank"
              >
                <Button variant="ghost">
                  <Github className="w-5" />
                  <span>{t("buttons.source")}</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
