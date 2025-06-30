"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { github } from "../utils/Icons";
import ThemeDropdown from "./ThemeDropdown/ThemeDropdown";
import SearchDialog from "./SearchDialog/SearchDialog";
import UnitToggle from "./UnitToggle/UnitToggle";
import LanguageSelector from "./LanguageSelector/LanguageSelector";
import { useTranslation } from "../hooks/useTranslation";

function Navbar() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="w-full py-4 flex items-center justify-between dark:bg-dark-grey/80 bg-white/80 backdrop-blur-sm rounded-lg px-4 mb-4">
      <div className="left">
        <h1 className="text-xl font-bold">{t("title")}</h1>
      </div>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <SearchDialog />

        <div className="btn-group flex items-center gap-2">
          <LanguageSelector />
          <UnitToggle />
          <ThemeDropdown />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
