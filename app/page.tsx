"use client";
import Image from "next/image";
import AirPollution from "./Components/AirPollution/AirPollution";
import DailyForecast from "./Components/DailyForecast/DailyForecast";
import FeelsLike from "./Components/FeelsLike/FeelsLike";
import Humidity from "./Components/Humidity/Humidity";
import Mapbox from "./Components/Mapbox/Mapbox";
import Navbar from "./Components/Navbar";
import Population from "./Components/Population/Population";
import Pressure from "./Components/Pressure/Pressure";
import Sunset from "./Components/Sunset/Sunset";
import Temperature from "./Components/Temperature/Temperature";
import UvIndex from "./Components/UvIndex/UvIndex";
import Visibility from "./Components/Visibility/Visibility";
import Wind from "./Components/Wind/Wind";
import defaultStates from "./utils/defaultStates";
import FiveDayForecast from "./Components/FiveDayForecast/FiveDayForecast";
import SearchHistory from "./Components/SearchHistory/SearchHistory";
import LocationPermission from "./Components/LocationPermission/LocationPermission";
import WeatherBackground from "./Components/WeatherBackground/WeatherBackground";
import { useWeatherStore } from "./store/weatherStore";
import { useWeatherData } from "./hooks/useWeatherData";
import { useGeolocation } from "./hooks/useGeolocation";
import { useEffect } from "react";
import { useTranslation } from "./hooks/useTranslation";
import { GeoCodedCity } from "./types/weather";

export default function Home() {
  const {
    activeCityCoords,
    setActiveCityCoords,
    setCurrentWeather,
    setFiveDayForecast,
    setAirQuality,
    setUvIndex,
    setHasRequestedLocation,
    hasRequestedLocation,
    lastSelectedCity,
    setLastSelectedCity,
  } = useWeatherStore();

  const { weather, forecast, airQuality, uvIndex, isLoading, error } =
    useWeatherData(activeCityCoords[0], activeCityCoords[1]);

  const { coords, permission, getCurrentPosition } = useGeolocation();
  const { t } = useTranslation();

  // Initialize with last selected city on page load
  useEffect(() => {
    if (
      lastSelectedCity &&
      activeCityCoords[0] === 0 &&
      activeCityCoords[1] === 0
    ) {
      setActiveCityCoords([lastSelectedCity.lat, lastSelectedCity.lon]);
    }
  }, [lastSelectedCity, activeCityCoords, setActiveCityCoords]);

  // Auto-request location on page load if not already requested and no last selected city
  useEffect(() => {
    if (!hasRequestedLocation && permission !== "denied" && !lastSelectedCity) {
      setHasRequestedLocation(true);
      getCurrentPosition();
    }
  }, [
    hasRequestedLocation,
    permission,
    setHasRequestedLocation,
    getCurrentPosition,
    lastSelectedCity,
  ]);

  // Update active city coords when location is obtained (only if no last selected city)
  useEffect(() => {
    if (
      coords &&
      activeCityCoords[0] === 0 &&
      activeCityCoords[1] === 0 &&
      !lastSelectedCity
    ) {
      setActiveCityCoords(coords);

      // Save current location as last selected city
      const currentLocationCity: GeoCodedCity = {
        name: "Current Location",
        country: "Unknown",
        lat: coords[0],
        lon: coords[1],
      };
      setLastSelectedCity(currentLocationCity);
    }
  }, [
    coords,
    activeCityCoords,
    setActiveCityCoords,
    lastSelectedCity,
    setLastSelectedCity,
  ]);

  // Update store with fetched data
  useEffect(() => {
    if (weather) setCurrentWeather(weather);
    if (forecast) setFiveDayForecast(forecast);
    if (airQuality) setAirQuality(airQuality);
    if (uvIndex) setUvIndex(uvIndex);
  }, [
    weather,
    forecast,
    airQuality,
    uvIndex,
    setCurrentWeather,
    setFiveDayForecast,
    setAirQuality,
    setUvIndex,
  ]);

  const getClickedCityCords = (
    lat: number,
    lon: number,
    cityName?: string,
    country?: string,
    state?: string
  ) => {
    setActiveCityCoords([lat, lon]);

    // Save as last selected city if we have the city information
    if (cityName && country) {
      const city: GeoCodedCity = {
        name: cityName,
        country: country,
        state: state,
        lat: lat,
        lon: lon,
      };
      setLastSelectedCity(city);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <WeatherBackground>
      <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
        <Navbar />

        {/* Location Permission */}
        <LocationPermission />

        {/* Search History */}
        <SearchHistory />

        <div className="pb-4 flex flex-col gap-4 md:flex-row">
          <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
            <Temperature />
            <FiveDayForecast />
          </div>
          <div className="flex flex-col w-full">
            <div className="instruments grid h-full gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
              <AirPollution />
              <Sunset />
              <Wind />
              <DailyForecast />
              <UvIndex />
              <Population />
              <FeelsLike />
              <Humidity />
              <Visibility />
              <Pressure />
            </div>
            <div className="mapbox-con mt-4 flex gap-4">
              {/*<Mapbox />*/}
              <div className="states flex flex-col gap-3 flex-1">
                <h2 className="flex items-center gap-2 font-medium">
                  {t("popularCities")}
                </h2>
                <div className="flex flex-col gap-4">
                  {defaultStates.map((state, index) => {
                    return (
                      <div
                        key={index}
                        className="border rounded-lg cursor-pointer dark:bg-dark-grey/80 bg-white/80 backdrop-blur-sm shadow-sm dark:shadow-none hover:bg-accent/80 transition-colors"
                        onClick={() => {
                          getClickedCityCords(
                            state.lat,
                            state.lon,
                            state.name,
                            state.country,
                            state.state
                          );
                        }}
                      >
                        <p className="px-6 py-4">{state.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="py-4 flex justify-center pb-8">
          <p className="footer-text text-sm flex items-center gap-1">
            Powered by&nbsp;
            <img
              src="https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png"
              alt="logo"
              width={60}
              height={50}
            />
            <a
              href="https://openweathermap.org/"
              target="_blank"
              className="text-red-300 font-bold"
            >
              &nbsp;OpenWeathermap.org&nbsp;
            </a>
            <a
              href="https://www.linkedin.com/in/sinanulusan/"
              target="_blank"
              className="text-sky-300 font-bold"
            >
              &nbsp;Developed by Sinan Ulusan
            </a>
          </p>
        </footer>
      </main>
    </WeatherBackground>
  );
}
