"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWeatherStore } from "@/app/store/weatherStore";
import { Locale, getTranslation } from "@/app/locales";
import { Globe } from "lucide-react";

const LanguageSelector = () => {
  const { locale, setLocale } = useWeatherStore();

  const languages = [
    { code: "en" as Locale, name: "English", flag: "🇺🇸" },
    { code: "tr" as Locale, name: "Türkçe", flag: "🇹🇷" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span>{languages.find((lang) => lang.code === locale)?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setLocale(language.code)}
            className={`flex items-center gap-2 ${
              locale === language.code ? "bg-accent" : ""
            }`}
          >
            <span>{language.flag}</span>
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
