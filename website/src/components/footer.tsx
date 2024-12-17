"use client";

import { useTranslations } from "next-intl";
import React from "react";
import LanguageSelest from "./ui/LanguageSelest";
import { ModeToggle } from "./ui/ModeToggle";

function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="flex flex-col w-full">
      <div className="flex flex-wrap justify-center items-center gap-3 mt-10 mb-5">
        <LanguageSelest />
        <ModeToggle />
      </div>
      <div className="p-3">
        <p className="text-sm text-center opacity-80">{t("footerText")}</p>
      </div>
    </footer>
  );
}

export default Footer;
