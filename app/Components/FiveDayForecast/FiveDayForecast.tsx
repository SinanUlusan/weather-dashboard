"use client";
import { useWeatherStore } from "@/app/store/weatherStore";
import { calender } from "@/app/utils/Icons";
import { unixToDay } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { useTranslation } from "@/app/hooks/useTranslation";

function FiveDayForecast() {
  const { fiveDayForecast, unitSystem } = useWeatherStore();
  const { t } = useTranslation();

  if (!fiveDayForecast || !fiveDayForecast.city || !fiveDayForecast.list) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { city, list } = fiveDayForecast;
  const tempUnit = unitSystem === "metric" ? t("celsius") : t("fahrenheit");

  const processData = (
    dailyData: {
      main: { temp_min: number; temp_max: number };
      dt: number;
    }[]
  ) => {
    let minTemp = Number.MAX_VALUE;
    let maxTemp = Number.MIN_VALUE;

    dailyData.forEach(
      (day: { main: { temp_min: number; temp_max: number }; dt: number }) => {
        if (day.main.temp_min < minTemp) {
          minTemp = day.main.temp_min;
        }
        if (day.main.temp_max > maxTemp) {
          maxTemp = day.main.temp_max;
        }
      }
    );

    return {
      day: unixToDay(dailyData[0].dt),
      minTemp: Math.round(minTemp),
      maxTemp: Math.round(maxTemp),
    };
  };

  const dailyForecasts = [];

  for (let i = 0; i < 40; i += 8) {
    const dailyData = list.slice(i, i + 5);
    dailyForecasts.push(processData(dailyData));
  }

  return (
    <div
      className="pt-6 pb-5 px-4 flex-1 border rounded-lg flex flex-col
        justify-between dark:bg-dark-grey/80 bg-white/80 backdrop-blur-sm shadow-sm dark:shadow-none"
    >
      <div>
        <h2 className="flex items-center gap-2 font-medium">
          {calender} {t("fiveDayForecast")} ({city.name})
        </h2>

        <div className="forecast-list pt-3">
          {dailyForecasts.map((day, i) => {
            return (
              <div
                key={i}
                className="daily-forecast py-4 flex flex-col justify-evenly border-b-2"
              >
                <p className="text-xl min-w-[3.5rem]">{day.day}</p>
                <p className="text-sm flex justify-between">
                  <span>{t("min")}</span>
                  <span>{t("max")}</span>
                </p>

                <div className="flex-1 flex items-center justify-between gap-4">
                  <p className="font-bold">
                    {day.minTemp}
                    {tempUnit}
                  </p>
                  <div className="temperature flex-1 w-full h-2 rounded-lg"></div>
                  <p className="font-bold">
                    {day.maxTemp}
                    {tempUnit}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FiveDayForecast;
