"use client";
import React, { useEffect, useState } from "react";
import { useWeatherStore } from "@/app/store/weatherStore";
import {
  clearSky,
  cloudy,
  drizzleIcon,
  navigation,
  rain,
  snow,
} from "@/app/utils/Icons";
import moment from "moment";
import { useTranslation } from "@/app/hooks/useTranslation";

function Temperature() {
  const { currentWeather, unitSystem } = useWeatherStore();
  const { t } = useTranslation();

  // State - must be declared before any conditional returns
  const [localTime, setLocalTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");

  // Live time update
  useEffect(() => {
    if (!currentWeather?.timezone) return;

    // update time every second
    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(currentWeather.timezone / 60);
      // custom format: 24 hour format
      const formatedTime = localMoment.format("HH:mm:ss");
      // day of the week
      const day = localMoment.format("dddd");

      setLocalTime(formatedTime);
      setCurrentDay(day);
    }, 1000);

    // clear interval
    return () => clearInterval(interval);
  }, [currentWeather?.timezone]);

  if (!currentWeather || !currentWeather.weather) {
    return (
      <div className="pt-6 pb-5 px-4 border rounded-lg flex flex-col justify-between dark:bg-dark-grey/80 bg-white/80 backdrop-blur-sm shadow-sm dark:shadow-none">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-8 bg-gray-300 rounded mb-4"></div>
          <div className="h-24 bg-gray-300 rounded mb-4"></div>
          <div className="h-6 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  const { main, timezone, name, weather } = currentWeather;

  const temp = Math.round(main?.temp);
  const minTemp = Math.round(main?.temp_min);
  const maxTemp = Math.round(main?.temp_max);
  const tempUnit = unitSystem === "metric" ? t("celsius") : t("fahrenheit");

  const { main: weatherMain, description } = weather[0];

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

  return (
    <div
      className="pt-6 pb-5 px-4 border rounded-lg flex flex-col 
        justify-between dark:bg-dark-grey/80 bg-white/80 backdrop-blur-sm shadow-sm dark:shadow-none"
    >
      <p className="flex justify-between items-center">
        <span className="font-medium">{currentDay}</span>
        <span className="font-medium">{localTime}</span>
      </p>
      <p className="pt-2 font-bold flex gap-1">
        <span>{name}</span>
        <span>{navigation}</span>
      </p>
      <p className="py-10 text-9xl font-bold self-center">
        {temp}
        {tempUnit}
      </p>

      <div>
        <div>
          <span>{getIcon()}</span>
          <p className="pt-2 capitalize text-lg font-medium">{description}</p>
        </div>
        <p className="flex items-center gap-2">
          <span>
            {t("min")}: {minTemp}
            {tempUnit}
          </span>
          <span>
            {t("max")}: {maxTemp}
            {tempUnit}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Temperature;
