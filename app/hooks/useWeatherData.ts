import useSWR from "swr";
import {
  WeatherData,
  FiveDayForecast,
  AirQualityData,
  UvIndexData,
  GeoCodedCity,
} from "../types/weather";
import { useWeatherStore } from "../store/weatherStore";

export const useWeatherData = (lat: number, lon: number) => {
  const { unitSystem } = useWeatherStore();

  // Don't fetch data if coordinates are [0, 0] (no location set)
  const hasValidCoords = lat !== 0 && lon !== 0 && lat && lon;

  const {
    data: weather,
    error: weatherError,
    isLoading: weatherLoading,
  } = useSWR<WeatherData>(
    hasValidCoords
      ? `/api/weather?lat=${lat}&lon=${lon}&units=${unitSystem}`
      : null,
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  const {
    data: forecast,
    error: forecastError,
    isLoading: forecastLoading,
  } = useSWR<FiveDayForecast>(
    hasValidCoords
      ? `/api/fiveday?lat=${lat}&lon=${lon}&units=${unitSystem}`
      : null,
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  const {
    data: airQuality,
    error: airQualityError,
    isLoading: airQualityLoading,
  } = useSWR<AirQualityData>(
    hasValidCoords ? `/api/pollution?lat=${lat}&lon=${lon}` : null,
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  const {
    data: uvIndex,
    error: uvError,
    isLoading: uvLoading,
  } = useSWR<UvIndexData>(
    hasValidCoords ? `/api/uv?lat=${lat}&lon=${lon}` : null,
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  return {
    weather,
    forecast,
    airQuality,
    uvIndex,
    isLoading:
      weatherLoading || forecastLoading || airQualityLoading || uvLoading,
    error: weatherError || forecastError || airQualityError || uvError,
  };
};

export const useGeoCoding = (search: string) => {
  const { data, error, isLoading } = useSWR<GeoCodedCity[]>(
    search && search.length > 2
      ? `/api/geocoded?search=${encodeURIComponent(search)}`
      : null,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 1000,
    }
  );

  return {
    geoCodedList: data || [],
    error,
    isLoading,
  };
};
