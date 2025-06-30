"use client";
import { useWeatherStore } from "@/app/store/weatherStore";
import { droplets } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { useTranslation } from "@/app/hooks/useTranslation";

function Humidity() {
  const { currentWeather } = useWeatherStore();
  const { t } = useTranslation();

  if (
    !currentWeather ||
    !currentWeather?.main ||
    !currentWeather?.main?.humidity
  ) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { humidity } = currentWeather?.main;

  const getHumidityText = (humidity: number) => {
    if (humidity < 30) return t("humidityDry");
    if (humidity >= 30 && humidity < 50) return t("humidityComfortable");
    if (humidity >= 50 && humidity < 70) return t("humidityNormal");
    if (humidity >= 70) return t("humidityHigh");
    return t("humidityUnknown");
  };

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey/80 bg-white/80 backdrop-blur-sm shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {droplets} {t("humidity")}
        </h2>
        <p className="pt-4 text-2xl">{humidity}%</p>
      </div>

      <p className="text-sm">{getHumidityText(humidity)}</p>
    </div>
  );
}

export default Humidity;
