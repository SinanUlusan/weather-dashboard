"use client";
import { useWeatherStore } from "@/app/store/weatherStore";
import { sunset } from "@/app/utils/Icons";
import { unixToTime } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { useTranslation } from "@/app/hooks/useTranslation";

function Sunset() {
  const { currentWeather } = useWeatherStore();
  const { t } = useTranslation();

  if (!currentWeather || !currentWeather?.sys || !currentWeather?.sys?.sunset) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const times = currentWeather?.sys?.sunset;
  const timezone = currentWeather?.timezone;

  const sunsetTime = unixToTime(times, timezone);
  const sunrise = unixToTime(currentWeather?.sys?.sunrise, timezone);

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey/80 bg-white/80 backdrop-blur-sm shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {sunset}
          {t("sunset")}
        </h2>
        <p className="pt-4 text-2xl">{sunsetTime}</p>
      </div>

      <p className="text-sm">
        [{t("sunrise")}] {sunrise}
      </p>
    </div>
  );
}

export default Sunset;
