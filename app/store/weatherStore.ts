import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  WeatherData,
  GeoCodedCity,
  FiveDayForecast,
  AirQualityData,
  UvIndexData,
  UnitSystem,
  SearchHistoryItem,
} from "../types/weather";
import { Locale, defaultLocale } from "../locales";

interface WeatherState {
  // Weather data
  currentWeather: WeatherData | null;
  fiveDayForecast: FiveDayForecast | null;
  airQuality: AirQualityData | null;
  uvIndex: UvIndexData | null;

  // Search functionality
  geoCodedList: GeoCodedCity[];
  inputValue: string;
  searchHistory: SearchHistoryItem[];

  // UI state
  activeCityCoords: [number, number];
  unitSystem: UnitSystem;
  locale: Locale;
  isLoading: boolean;
  error: string | null;

  // Location state
  locationPermission: "granted" | "denied" | "prompt" | null;
  hasRequestedLocation: boolean;

  // Last selected city for persistence
  lastSelectedCity: GeoCodedCity | null;

  // Actions
  setCurrentWeather: (weather: WeatherData | null) => void;
  setFiveDayForecast: (forecast: FiveDayForecast | null) => void;
  setAirQuality: (quality: AirQualityData | null) => void;
  setUvIndex: (uv: UvIndexData | null) => void;
  setGeoCodedList: (list: GeoCodedCity[]) => void;
  setInputValue: (value: string) => void;
  setActiveCityCoords: (coords: [number, number]) => void;
  setUnitSystem: (unit: UnitSystem) => void;
  setLocale: (locale: Locale) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setLocationPermission: (
    permission: "granted" | "denied" | "prompt" | null
  ) => void;
  setHasRequestedLocation: (requested: boolean) => void;
  setLastSelectedCity: (city: GeoCodedCity | null) => void;

  // Search history actions
  addToSearchHistory: (city: GeoCodedCity) => void;
  removeFromSearchHistory: (index: number) => void;
  clearSearchHistory: () => void;
}

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentWeather: null,
      fiveDayForecast: null,
      airQuality: null,
      uvIndex: null,
      geoCodedList: [],
      inputValue: "",
      searchHistory: [],
      activeCityCoords: [0, 0], // Will be updated by location detection or user selection
      unitSystem: "metric",
      locale: defaultLocale,
      isLoading: false,
      error: null,
      locationPermission: null,
      hasRequestedLocation: false,
      lastSelectedCity: null,

      // Actions
      setCurrentWeather: (weather) => set({ currentWeather: weather }),
      setFiveDayForecast: (forecast) => set({ fiveDayForecast: forecast }),
      setAirQuality: (quality) => set({ airQuality: quality }),
      setUvIndex: (uv) => set({ uvIndex: uv }),
      setGeoCodedList: (list) => set({ geoCodedList: list }),
      setInputValue: (value) => set({ inputValue: value }),
      setActiveCityCoords: (coords) => set({ activeCityCoords: coords }),
      setUnitSystem: (unit) => set({ unitSystem: unit }),
      setLocale: (locale) => set({ locale }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      setLocationPermission: (permission) =>
        set({ locationPermission: permission }),
      setHasRequestedLocation: (requested) =>
        set({ hasRequestedLocation: requested }),
      setLastSelectedCity: (city) => set({ lastSelectedCity: city }),

      // Search history actions
      addToSearchHistory: (city) => {
        const { searchHistory } = get();
        const newItem: SearchHistoryItem = {
          ...city,
          timestamp: Date.now(),
        };

        // Remove if already exists
        const filteredHistory = searchHistory.filter(
          (item) => !(item.lat === city.lat && item.lon === city.lon)
        );

        // Add to beginning and keep only last 5
        const updatedHistory = [newItem, ...filteredHistory].slice(0, 5);

        set({ searchHistory: updatedHistory });
      },

      removeFromSearchHistory: (index) => {
        const { searchHistory } = get();
        const updatedHistory = searchHistory.filter((_, i) => i !== index);
        set({ searchHistory: updatedHistory });
      },

      clearSearchHistory: () => set({ searchHistory: [] }),
    }),
    {
      name: "weather-storage",
      partialize: (state) => ({
        searchHistory: state.searchHistory,
        unitSystem: state.unitSystem,
        locale: state.locale,
        locationPermission: state.locationPermission,
        hasRequestedLocation: state.hasRequestedLocation,
        lastSelectedCity: state.lastSelectedCity,
      }),
      // Add version to handle potential schema changes
      version: 1,
      // Add migration function if needed in the future
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Handle migration from version 0 to 1
          return persistedState;
        }
        return persistedState;
      },
      // Add storage configuration for better compatibility
      storage: {
        getItem: (name) => {
          try {
            const item = localStorage.getItem(name);
            return item ? JSON.parse(item) : null;
          } catch (error) {
            console.error("Error reading from localStorage:", error);
            return null;
          }
        },
        setItem: (name, value) => {
          try {
            localStorage.setItem(name, JSON.stringify(value));
          } catch (error) {
            console.error("Error writing to localStorage:", error);
          }
        },
        removeItem: (name) => {
          try {
            localStorage.removeItem(name);
          } catch (error) {
            console.error("Error removing from localStorage:", error);
          }
        },
      },
    }
  )
);
