"use client";

import { useWeatherStore } from "@/app/store/weatherStore";
import { sun } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { UvProgress } from "../UvProgress/UvProgress";
import { useTranslation } from "@/app/hooks/useTranslation";

function UvIndex() {
  const { uvIndex } = useWeatherStore();
  const { t } = useTranslation();

  if (!uvIndex || !uvIndex.daily) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { daily } = uvIndex;
  const { uv_index_clear_sky_max, uv_index_max } = daily;

  const uvIndexMax = uv_index_max[0].toFixed(0);

  const uvIndexCategory = (uvIndex: number) => {
    if (uvIndex <= 2) {
      return {
        text: t("uvIndexLow"),
        protection: t("uvIndexLowProtection"),
      };
    } else if (uvIndex <= 5) {
      return {
        text: t("uvIndexModerate"),
        protection: t("uvIndexModerateProtection"),
      };
    } else if (uvIndex <= 7) {
      return {
        text: t("uvIndexHigh"),
        protection: t("uvIndexHighProtection"),
      };
    } else if (uvIndex <= 10) {
      return {
        text: t("uvIndexVeryHigh"),
        protection: t("uvIndexVeryHighProtection"),
      };
    } else if (uvIndex > 10) {
      return {
        text: t("uvIndexExtreme"),
        protection: t("uvIndexExtremeProtection"),
      };
    } else {
      return {
        text: t("uvIndexExtreme"),
        protection: t("uvIndexExtremeProtection"),
      };
    }
  };

  const marginLeftPercentage = (uvIndexMax / 14) * 100;

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-5 dark:bg-dark-grey/80 bg-white/80 backdrop-blur-sm shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {sun} {t("uvIndex")}
        </h2>
        <div className="pt-4 flex flex-col gap-1">
          <p className="text-2xl">
            {uvIndexMax}
            <span className="text-sm">
              ({uvIndexCategory(uvIndexMax).text})
            </span>
          </p>

          <UvProgress
            value={marginLeftPercentage}
            max={14}
            className="progress"
          />
        </div>
      </div>

      <p className="text-sm">{uvIndexCategory(uvIndexMax).protection} </p>
    </div>
  );
}

export default UvIndex;
