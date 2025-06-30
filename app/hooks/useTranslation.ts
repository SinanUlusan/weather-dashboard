import { useWeatherStore } from "../store/weatherStore";
import { getTranslation, TranslationKey } from "../locales";

export const useTranslation = () => {
  const { locale } = useWeatherStore();

  const t = (key: TranslationKey, params?: Record<string, string>): string => {
    return getTranslation(locale, key, params);
  };

  return { t, locale };
};
