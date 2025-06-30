import { en } from "./en";
import { tr } from "./tr";

export type Locale = "en" | "tr";

export const locales = {
  en,
  tr,
} as const;

export type TranslationKey = keyof typeof en;

export const getTranslation = (
  locale: Locale,
  key: TranslationKey,
  params?: Record<string, string>
): string => {
  let translation = locales[locale][key] || locales.en[key] || key;

  // Handle interpolation
  if (params) {
    Object.entries(params).forEach(([param, value]) => {
      translation = translation.replace(`{${param}}`, value);
    });
  }

  return translation;
};

export const defaultLocale: Locale = "en";
