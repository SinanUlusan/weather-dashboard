"use client";
import React from "react";
import { useWeatherStore } from "@/app/store/weatherStore";
import { clearSky, cloudy, drizzleIcon, rain, snow } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import moment from "moment";
import { useTranslation } from "@/app/hooks/useTranslation";

function DailyForecast() {
  const { currentWeather, fiveDayForecast, unitSystem } = useWeatherStore();
  const { t } = useTranslation();

  if (!fiveDayForecast || !fiveDayForecast.city || !fiveDayForecast.list) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  if (!currentWeather || !currentWeather.weather) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  //filter the list for today's forecast
  const todaysForecast = fiveDayForecast.list.filter(
    (forecast: { dt_txt: string; main: { temp: number } }) => {
      return forecast.dt_txt.startsWith(todayString);
    }
  );

  const { main: weatherMain } = currentWeather.weather[0];

  if (todaysForecast.length < 1) {
    return (
      <Skeleton className="h-[12rem] w-full col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2" />
    );
  }

  const getIcon = () => {
    switch (weatherMain) {
      case "Drizzle":
        return drizzleIcon;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Clear":
        return clearSky;
      case "Clouds":
        return cloudy;
      default:
        return clearSky;
    }
  };

  const tempUnit = unitSystem === "metric" ? t("celsius") : t("fahrenheit");

  return (
    <div
      className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8
        dark:bg-dark-grey/80 bg-white/80 backdrop-blur-sm shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2"
    >
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
        {t("dailyForecast")}
      </h2>
      <div className="h-full flex gap-10 overflow-hidden">
        {todaysForecast.length < 1 ? (
          <div className="flex justify-center items-center">
            <h1 className="text-[3rem] line-through text-rose-500">
              No Data Available!
            </h1>
          </div>
        ) : (
          <div className="w-full">
            <Carousel>
              <CarouselContent>
                {todaysForecast.map(
                  (forecast: { dt_txt: string; main: { temp: number } }) => {
                    return (
                      <CarouselItem
                        key={forecast.dt_txt}
                        className="flex flex-col gap-0 basis-[5.5rem] cursor-grab"
                      >
                        <p className=" text-gray-300">
                          {moment(forecast.dt_txt).format("HH:mm")}
                        </p>
                        <p>{getIcon()}</p>
                        <p className="2">
                          {Math.round(forecast.main.temp)}
                          {tempUnit}
                        </p>
                      </CarouselItem>
                    );
                  }
                )}
              </CarouselContent>
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
}

export default DailyForecast;
