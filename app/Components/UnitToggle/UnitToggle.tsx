"use client";
import { Button } from "@/components/ui/button";
import { useWeatherStore } from "@/app/store/weatherStore";
import { UnitSystem } from "@/app/types/weather";
import { Thermometer, ThermometerSun } from "lucide-react";
import { useTranslation } from "@/app/hooks/useTranslation";

const UnitToggle = () => {
  const { unitSystem, setUnitSystem } = useWeatherStore();
  const { t } = useTranslation();

  const toggleUnit = () => {
    const newUnit: UnitSystem = unitSystem === "metric" ? "imperial" : "metric";
    setUnitSystem(newUnit);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">{t("units")}</span>
      <Button
        variant="outline"
        size="sm"
        onClick={toggleUnit}
        className="flex items-center gap-2"
      >
        {unitSystem === "metric" ? (
          <>
            <Thermometer className="h-4 w-4" />
            <span>{t("celsius")}</span>
          </>
        ) : (
          <>
            <ThermometerSun className="h-4 w-4" />
            <span>{t("fahrenheit")}</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default UnitToggle;
