"use client";
import { useWeatherStore } from "@/app/store/weatherStore";
import { useGeoCoding } from "@/app/hooks/useWeatherData";
import { searchIcon } from "@/app/utils/Icons";
import { Button } from "@/components/ui/button";
import { Command, CommandInput } from "@/components/ui/command";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { GeoCodedCity } from "@/app/types/weather";
import React, { useState, useEffect } from "react";
import { useTranslation } from "@/app/hooks/useTranslation";

function SearchDialog() {
  const {
    inputValue,
    setInputValue,
    setActiveCityCoords,
    addToSearchHistory,
    setLastSelectedCity,
    error,
    setError,
  } = useWeatherStore();

  const {
    geoCodedList,
    error: geocodingError,
    isLoading,
  } = useGeoCoding(inputValue);
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  // Handle dialog open/close
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Clear input value when dialog is closed
      setInputValue("");
      setError(null);
      setHoveredIndex(0);
    }
  };

  // Handle input changes
  const handleInput = (value: string) => {
    setInputValue(value);
    setError(null); // Clear any previous errors
  };

  const getClickedCoords = (city: GeoCodedCity) => {
    setActiveCityCoords([city.lat, city.lon]);
    addToSearchHistory(city);
    setLastSelectedCity(city); // Save as last selected city
    setIsOpen(false);
    setInputValue("");
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHoveredIndex((prev) =>
        prev < geoCodedList.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHoveredIndex((prev) =>
        prev > 0 ? prev - 1 : geoCodedList.length - 1
      );
    } else if (e.key === "Enter" && geoCodedList.length > 0) {
      e.preventDefault();
      getClickedCoords(geoCodedList[hoveredIndex]);
    }
  };

  // Reset hovered index when list changes
  useEffect(() => {
    setHoveredIndex(0);
  }, [geoCodedList]);

  return (
    <div className="search-btn">
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border inline-flex items-center justify-center text-sm font-medium hover:dark:bg-[#131313] hover:bg-slate-100 ease-in-out duration-200"
          >
            <p className="text-sm text-muted-foreground">
              {t("searchPlaceholder")}
            </p>
            <div className="command bg-transparent py-[2px] pl-[5px] pr-[7px] rounded-sm ml-[10rem] flex items-center gap-2">
              {searchIcon}
            </div>
          </Button>
        </DialogTrigger>

        <DialogContent className="p-0">
          <Command className="rounded-lg border shadow-md">
            <CommandInput
              value={inputValue}
              onValueChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder={t("searchPlaceholder")}
            />

            {/* Error Display */}
            {(error || geocodingError) && (
              <div className="px-3 py-2">
                <p className="text-sm text-destructive">
                  {error || geocodingError?.message || t("errorOccurred")}
                </p>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="px-3 py-2">
                <p className="text-sm text-muted-foreground">
                  {t("searching")}
                </p>
              </div>
            )}

            {/* Results */}
            <ul className="px-3">
              {geoCodedList.length > 0 && (
                <p className="p-2 text-sm text-muted-foreground">
                  {t("suggestions")}
                </p>
              )}

              {geoCodedList.length === 0 &&
                inputValue &&
                !isLoading &&
                !error && (
                  <p className="p-2 text-sm text-muted-foreground">
                    {t("noResults")}
                  </p>
                )}

              {geoCodedList.map((item: GeoCodedCity, index: number) => {
                const { country, state, name } = item;
                return (
                  <li
                    key={`${name}-${country}-${index}`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    className={`py-3 px-2 my-2 text-sm rounded-sm cursor-pointer transition-colors
                      ${
                        hoveredIndex === index
                          ? "bg-accent"
                          : "hover:bg-accent/50"
                      }
                    `}
                    onClick={() => getClickedCoords(item)}
                  >
                    <p className="font-medium">
                      {name}, {state && state + ","} {country}
                    </p>
                  </li>
                );
              })}
            </ul>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SearchDialog;
