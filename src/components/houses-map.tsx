"use client";

import { useMemo } from "react";
import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerTooltip,
} from "@/components/ui/map";
import { formatPrice } from "@/lib/currency";
import { useLocale, useTranslations } from "@/lib/i18n/context";
import type { HouseWithScore } from "@/lib/queries";

type Props = {
  houses: HouseWithScore[];
};

type HouseWithCoords = HouseWithScore & {
  latitude: number;
  longitude: number;
};

function hasCoords(house: HouseWithScore): house is HouseWithCoords {
  return house.latitude !== null && house.longitude !== null;
}

export function HousesMap({ houses }: Props) {
  const t = useTranslations();
  const locale = useLocale();

  const located = houses.filter(hasCoords);

  // Compute initial viewport from all located houses synchronously so the map
  // starts at the correct position with no post-mount jump.
  const initialViewport = useMemo(() => {
    if (located.length === 0) return null;

    if (located.length === 1) {
      return {
        center: [located[0].longitude, located[0].latitude] as [number, number],
        zoom: 13,
      };
    }

    let minLon = Infinity,
      minLat = Infinity,
      maxLon = -Infinity,
      maxLat = -Infinity;

    for (const h of located) {
      if (h.longitude < minLon) minLon = h.longitude;
      if (h.longitude > maxLon) maxLon = h.longitude;
      if (h.latitude < minLat) minLat = h.latitude;
      if (h.latitude > maxLat) maxLat = h.latitude;
    }

    return {
      bounds: [[minLon, minLat], [maxLon, maxLat]] as [[number, number], [number, number]],
      fitBoundsOptions: { padding: 60, maxZoom: 14 },
    };
  }, [located]);

  return (
    <div className="mb-8">
      <h2 className="mb-3 text-base font-semibold">{t("dashboard.mapTitle")}</h2>

      {located.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border px-4 py-3 text-sm text-muted-foreground">
          {t("dashboard.mapNoCoordinates")}
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border" style={{ height: 320 }}>
          <Map
            className="h-full w-full"
            {...initialViewport}
          >
            <MapControls position="bottom-right" />

            {located.map((house) => (
              <MapMarker
                key={house.id}
                longitude={house.longitude}
                latitude={house.latitude}
              >
                <MarkerContent />
                <MarkerTooltip>
                  <span className="font-semibold">{house.name}</span>
                  <br />
                  <span>{formatPrice(Number(house.price), house.currency, locale)}</span>
                </MarkerTooltip>
              </MapMarker>
            ))}
          </Map>
        </div>
      )}
    </div>
  );
}
