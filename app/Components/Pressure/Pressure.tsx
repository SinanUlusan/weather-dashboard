"use client";
import { useWeatherStore } from "@/app/store/weatherStore";
import { gauge } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { useTranslation } from "@/app/hooks/useTranslation";

function Pressure() {
  const { currentWeather } = useWeatherStore();
  const { t } = useTranslation();

  if (
    !currentWeather ||
    !currentWeather?.main ||
    !currentWeather?.main?.pressure
  ) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { pressure } = currentWeather?.main;

  const getPressureDescription = (pressure: number) => {
    if (pressure < 1000) return t("pressureVeryLow");
    if (pressure >= 1000 && pressure < 1015) return t("pressureLow");
    if (pressure >= 1015 && pressure < 1025) return t("pressureNormal");
    if (pressure >= 1025 && pressure < 1040) return t("pressureHigh");
    if (pressure >= 1040) return t("pressureVeryHigh");
    return t("pressureUnknown");
  };

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey/80 bg-white/80 backdrop-blur-sm shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {gauge} {t("pressure")}
        </h2>
        <p className="pt-4 text-2xl">{pressure} hPa</p>
      </div>

      <p className="text-sm">{getPressureDescription(pressure)}</p>
    </div>
  );
}

export default Pressure;
