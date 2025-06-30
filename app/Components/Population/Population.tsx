"use client";
import { useWeatherStore } from "@/app/store/weatherStore";
import { people } from "@/app/utils/Icons";
import { formatNumber } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { useTranslation } from "@/app/hooks/useTranslation";

function Population() {
  const { fiveDayForecast } = useWeatherStore();
  const { t } = useTranslation();

  const { city } = fiveDayForecast || {};

  if (!fiveDayForecast || !city) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey/80 bg-white/80 backdrop-blur-sm shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {people} {t("population")}
        </h2>
        <p className="pt-4 text-2xl">{formatNumber(city.population)}</p>
      </div>
      <p className="text-sm">
        {t("populationProvidedByUN", { city: city.name })}
      </p>
    </div>
  );
}

export default Population;
