"use client";
import { useWeatherStore } from "@/app/store/weatherStore";
import { eye } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { useTranslation } from "@/app/hooks/useTranslation";

function Visibility() {
  const { currentWeather } = useWeatherStore();
  const { t } = useTranslation();

  if (!currentWeather || !currentWeather?.visibility) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { visibility } = currentWeather;

  const getVisibilityDescription = (visibility: number) => {
    const visibilityInKm = Math.round(visibility / 1000);

    if (visibilityInKm > 10) return t("visibilityExcellent");
    if (visibilityInKm > 5) return t("visibilityGood");
    if (visibilityInKm > 2) return t("visibilityModerate");
    if (visibilityInKm <= 2) return t("visibilityPoor");
    return t("visibilityUnknown");
  };

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey/80 bg-white/80 backdrop-blur-sm shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {eye} {t("visibility")}
        </h2>
        <p className="pt-4 text-2xl">{Math.round(visibility / 1000)} km</p>
      </div>

      <p className="text-sm">{getVisibilityDescription(visibility)}</p>
    </div>
  );
}

export default Visibility;
