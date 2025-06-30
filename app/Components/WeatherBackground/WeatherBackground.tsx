"use client";

import { useWeatherStore } from "../../store/weatherStore";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface WeatherBackgroundProps {
  children: React.ReactNode;
}

const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ children }) => {
  const { currentWeather } = useWeatherStore();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  const getWeatherBackground = () => {
    if (
      !currentWeather ||
      !currentWeather.weather ||
      currentWeather.weather.length === 0
    ) {
      return "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800";
    }

    const weatherId = currentWeather.weather[0].id;
    const isDark = theme === "dark";

    // Weather condition mapping based on OpenWeatherMap weather codes
    // https://openweathermap.org/weather-conditions
    if (weatherId >= 200 && weatherId < 300) {
      // Thunderstorm
      return isDark
        ? "bg-gradient-to-br from-purple-900 via-gray-800 to-purple-900"
        : "bg-gradient-to-br from-gray-300 via-purple-200 to-gray-400";
    } else if (weatherId >= 300 && weatherId < 400) {
      // Drizzle
      return isDark
        ? "bg-gradient-to-br from-blue-900 via-gray-800 to-blue-800"
        : "bg-gradient-to-br from-blue-100 via-gray-200 to-blue-200";
    } else if (weatherId >= 500 && weatherId < 600) {
      // Rain
      if (weatherId >= 511 && weatherId <= 531) {
        // Heavy rain
        return isDark
          ? "bg-gradient-to-br from-gray-800 via-blue-900 to-gray-900"
          : "bg-gradient-to-br from-gray-300 via-blue-300 to-gray-400";
      }
      return isDark
        ? "bg-gradient-to-br from-blue-800 via-gray-700 to-blue-900"
        : "bg-gradient-to-br from-blue-200 via-gray-100 to-blue-300";
    } else if (weatherId >= 600 && weatherId < 700) {
      // Snow
      return isDark
        ? "bg-gradient-to-br from-blue-900 via-gray-800 to-blue-800"
        : "bg-gradient-to-br from-blue-100 via-white to-blue-200";
    } else if (weatherId >= 700 && weatherId < 800) {
      // Atmosphere (fog, mist, etc.)
      return isDark
        ? "bg-gradient-to-br from-gray-700 via-gray-600 to-gray-800"
        : "bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300";
    } else if (weatherId === 800) {
      // Clear sky
      const hour = new Date().getHours();
      if (hour >= 6 && hour <= 18) {
        // Day time
        return isDark
          ? "bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900"
          : "bg-gradient-to-br from-blue-400 via-sky-300 to-blue-500";
      } else {
        // Night time
        return isDark
          ? "bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
          : "bg-gradient-to-br from-indigo-900 via-blue-800 to-slate-800";
      }
    } else if (weatherId >= 801 && weatherId <= 804) {
      // Clouds
      if (weatherId === 801) {
        // Few clouds
        const hour = new Date().getHours();
        if (hour >= 6 && hour <= 18) {
          return isDark
            ? "bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-800"
            : "bg-gradient-to-br from-blue-300 via-sky-200 to-blue-400";
        } else {
          return isDark
            ? "bg-gradient-to-br from-slate-800 via-blue-800 to-indigo-800"
            : "bg-gradient-to-br from-indigo-800 via-blue-700 to-slate-700";
        }
      } else if (weatherId === 802) {
        // Scattered clouds
        return isDark
          ? "bg-gradient-to-br from-gray-700 via-blue-700 to-gray-800"
          : "bg-gradient-to-br from-gray-200 via-blue-200 to-gray-300";
      } else {
        // Broken/Overcast clouds
        return isDark
          ? "bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900"
          : "bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400";
      }
    }

    // Default fallback
    return "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800";
  };

  const getWeatherOverlay = () => {
    if (
      !currentWeather ||
      !currentWeather.weather ||
      currentWeather.weather.length === 0
    ) {
      return null;
    }

    const weatherId = currentWeather.weather[0].id;
    const isDark = theme === "dark";

    // Add sophisticated weather effects
    if (weatherId >= 200 && weatherId < 300) {
      // Thunderstorm effect with multiple lightning bolts
      return (
        <div className="absolute inset-0 overflow-hidden">
          {/* Lightning bolts with custom animation */}
          <div className="absolute top-0 left-1/4 w-0.5 h-32 bg-yellow-300 weather-lightning"></div>
          <div
            className="absolute top-10 left-3/4 w-0.5 h-24 bg-yellow-300 weather-lightning"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-20 left-1/2 w-0.5 h-28 bg-yellow-300 weather-lightning"
            style={{ animationDelay: "2s" }}
          ></div>

          {/* Floating clouds */}
          <div className="absolute top-10 left-10 w-20 h-8 bg-gray-400 rounded-full opacity-30 weather-cloud"></div>
          <div
            className="absolute top-20 right-20 w-16 h-6 bg-gray-400 rounded-full opacity-30 weather-cloud"
            style={{ animationDelay: "5s" }}
          ></div>
        </div>
      );
    } else if (weatherId >= 500 && weatherId < 600) {
      // Rain effect with multiple raindrops
      return (
        <div className="absolute inset-0 overflow-hidden">
          {/* Multiple raindrops with custom animation */}
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 bg-blue-400 weather-rain opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1.2 + Math.random() * 0.6}s`,
              }}
            />
          ))}

          {/* Floating clouds for rain */}
          <div className="absolute top-5 left-1/4 w-24 h-10 bg-gray-300 rounded-full opacity-40 weather-cloud"></div>
          <div
            className="absolute top-8 right-1/4 w-20 h-8 bg-gray-300 rounded-full opacity-40 weather-cloud"
            style={{ animationDelay: "8s" }}
          ></div>
        </div>
      );
    } else if (weatherId >= 600 && weatherId < 700) {
      // Snow effect with multiple snowflakes
      return (
        <div className="absolute inset-0 overflow-hidden">
          {/* Multiple snowflakes with custom animation */}
          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full weather-snow opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2.5 + Math.random() * 2}s`,
              }}
            />
          ))}

          {/* Larger snowflakes */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`large-${i}`}
              className="absolute w-2 h-2 bg-white rounded-full weather-snow opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3.5 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      );
    } else if (weatherId === 800) {
      // Clear sky effects
      const hour = new Date().getHours();
      if (hour >= 6 && hour <= 18) {
        // Day time - add sun rays
        return (
          <div className="absolute inset-0 overflow-hidden">
            {/* Sun with custom glow animation */}
            <div className="absolute top-10 right-10 w-16 h-16 bg-yellow-300 rounded-full weather-sun"></div>
            <div
              className="absolute top-8 right-8 w-20 h-20 bg-yellow-200 rounded-full weather-sun"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        );
      } else {
        // Night time - add stars
        return (
          <div className="absolute inset-0 overflow-hidden">
            {/* Stars with custom twinkle animation */}
            {Array.from({ length: 60 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-0.5 bg-white rounded-full weather-star"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 50}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${1.5 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        );
      }
    } else if (weatherId >= 801 && weatherId <= 804) {
      // Cloud effects
      return (
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating clouds with custom animation */}
          <div className="absolute top-10 left-10 w-24 h-12 bg-gray-300 rounded-full opacity-30 weather-cloud"></div>
          <div
            className="absolute top-20 right-20 w-20 h-10 bg-gray-300 rounded-full opacity-30 weather-cloud"
            style={{ animationDelay: "8s" }}
          ></div>
          <div
            className="absolute top-15 left-1/2 w-16 h-8 bg-gray-300 rounded-full opacity-30 weather-cloud"
            style={{ animationDelay: "15s" }}
          ></div>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className={`min-h-screen relative transition-all duration-1000 ease-in-out ${getWeatherBackground()}`}
    >
      {getWeatherOverlay()}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default WeatherBackground;
