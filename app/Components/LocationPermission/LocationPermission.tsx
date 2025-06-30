"use client";
import { useGeolocation } from "@/app/hooks/useGeolocation";
import { useWeatherStore } from "@/app/store/weatherStore";
import { useTranslation } from "@/app/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import { MapPin, AlertCircle, Loader2 } from "lucide-react";
import { useEffect } from "react";

const LocationPermission = () => {
  const { coords, isLoading, error, permission, getCurrentPosition } =
    useGeolocation();
  const {
    setActiveCityCoords,
    setLocationPermission,
    setHasRequestedLocation,
    hasRequestedLocation,
  } = useWeatherStore();
  const { t } = useTranslation();

  useEffect(() => {
    setLocationPermission(permission);
  }, [permission, setLocationPermission]);

  useEffect(() => {
    if (coords) {
      setActiveCityCoords(coords);
    }
  }, [coords, setActiveCityCoords]);

  const handleGetLocation = () => {
    setHasRequestedLocation(true);
    getCurrentPosition();
  };

  // Don't show anything if location is granted and we have coords
  if (permission === "granted" && coords) {
    return null;
  }

  // Don't show if user hasn't requested location yet
  if (!hasRequestedLocation && permission !== "denied") {
    return (
      <div className="mt-4 p-4 dark:bg-dark-grey/80 bg-white/80 backdrop-blur-sm rounded-lg border">
        <div className="mb-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {t("currentLocation")}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <h3 className="text-sm font-medium">{t("getCurrentLocation")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("locationAccessRequired")}
            </p>
          </div>
          <Button onClick={handleGetLocation} size="sm">
            {t("enableLocation")}
          </Button>
        </div>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="mt-4 p-4 dark:bg-dark-grey/80 bg-white/80 backdrop-blur-sm rounded-lg border">
        <div className="mb-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {t("currentLocation")}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          <div className="flex-1">
            <h3 className="text-sm font-medium">{t("currentLocation")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("locationLoading")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || permission === "denied") {
    return (
      <div className="mt-4 p-4 dark:bg-dark-grey/80 bg-white/80 backdrop-blur-sm rounded-lg border border-destructive/20">
        <div className="mb-3">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            {t("currentLocation")}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-destructive">
              {permission === "denied"
                ? t("locationPermissionDenied")
                : t("locationUnavailable")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {permission === "denied"
                ? t("locationAccessDenied")
                : error || t("locationNotSupported")}
            </p>
          </div>
          {permission === "denied" && (
            <Button onClick={handleGetLocation} size="sm" variant="outline">
              {t("enableLocation")}
            </Button>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default LocationPermission;
