"use client";
import { useWeatherStore } from "@/app/store/weatherStore";
import { thermo } from "@/app/utils/Icons";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { useTranslation } from "@/app/hooks/useTranslation";

function AirPollution() {
  const { airQuality } = useWeatherStore();
  const { t } = useTranslation();

  // check if airQuality is available, check if necessary properties are available
  if (
    !airQuality ||
    !airQuality.list ||
    !airQuality.list[0] ||
    !airQuality.list[0].main
  ) {
    return (
      <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full" />
    );
  }

  const airQualityIndex = airQuality.list[0].main.aqi * 10;

  const getAirQualityText = (aqi: number) => {
    if (aqi <= 20) return t("airQualityGood");
    if (aqi <= 40) return t("airQualityModerate");
    if (aqi <= 60) return t("airQualityUnhealthySensitive");
    if (aqi <= 80) return t("airQualityUnhealthy");
    if (aqi <= 100) return t("airQualityVeryUnhealthy");
    return t("airQualityHazardous");
  };

  return (
    <div
      className="air-pollution pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8
       dark:bg-dark-grey/80 bg-white/80 backdrop-blur-sm shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2"
    >
      <h2 className="flex items-center gap-2 font-medium">
        {thermo}
        {t("airQuality")}
      </h2>
      <Progress value={airQualityIndex} max={100} className="progress" />
      <p className="text-sm">{getAirQualityText(airQualityIndex)}</p>
    </div>
  );
}

export default AirPollution;
