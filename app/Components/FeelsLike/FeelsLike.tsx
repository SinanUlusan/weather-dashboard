"use client";
import { useWeatherStore } from "@/app/store/weatherStore";
import { thermometer } from "@/app/utils/Icons";
import { kelvinToCelsius } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { useTranslation } from "@/app/hooks/useTranslation";

function FeelsLike() {
  const { currentWeather } = useWeatherStore();
  const { t } = useTranslation();

  if (
    !currentWeather ||
    !currentWeather?.main ||
    !currentWeather?.main?.feels_like
  ) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { feels_like, temp_min, temp_max } = currentWeather?.main;

  const feelsLikeText = (
    feelsLike: number,
    minTemo: number,
    maxTemp: number
  ) => {
    const avgTemp = (minTemo + maxTemp) / 2;

    if (feelsLike < avgTemp - 5) {
      return t("feelsLikeMuchColder");
    }
    if (feelsLike > avgTemp - 5 && feelsLike <= avgTemp + 5) {
      return t("feelsLikeClose");
    }
    if (feelsLike > avgTemp + 5) {
      return t("feelsLikeMuchWarmer");
    }

    return t("feelsLikeDifferent");
  };

  const feelsLikeDescription = feelsLikeText(feels_like, temp_min, temp_max);

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey/80 bg-white/80 backdrop-blur-sm shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {thermometer} {t("feelsLike")}
        </h2>
        <p className="pt-4 text-2xl">{kelvinToCelsius(feels_like)}°</p>
      </div>

      <p className="text-sm">{feelsLikeDescription}</p>
    </div>
  );
}

export default FeelsLike;
