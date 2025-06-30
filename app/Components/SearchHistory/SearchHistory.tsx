"use client";
import { useWeatherStore } from "@/app/store/weatherStore";
import { SearchHistoryItem } from "@/app/types/weather";
import { Button } from "@/components/ui/button";
import { Clock, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useTranslation } from "@/app/hooks/useTranslation";

const SearchHistory = () => {
  const {
    searchHistory,
    setActiveCityCoords,
    removeFromSearchHistory,
    setLastSelectedCity,
  } = useWeatherStore();
  const { t } = useTranslation();

  if (searchHistory.length === 0) {
    return null;
  }

  const handleCityClick = (city: SearchHistoryItem) => {
    setActiveCityCoords([city.lat, city.lon]);
    setLastSelectedCity(city);
  };

  const handleRemove = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    removeFromSearchHistory(index);
  };

  return (
    <div className="my-4 p-4 dark:bg-dark-grey/80 bg-white/80 backdrop-blur-sm rounded-lg border">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-medium">{t("recentSearches")}</h3>
      </div>
      <div className="space-y-2">
        {searchHistory.map((city, index) => (
          <div
            key={`${city.lat}-${city.lon}-${city.timestamp}`}
            className="flex items-center justify-between p-2 rounded-md hover:bg-accent/80 cursor-pointer transition-colors"
            onClick={() => handleCityClick(city)}
          >
            <div className="flex-1">
              <p className="text-sm font-medium">
                {city.name}, {city.state && `${city.state}, `}
                {city.country}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(city.timestamp, { addSuffix: true })}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => handleRemove(index, e)}
              className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
