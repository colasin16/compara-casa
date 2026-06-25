"use client";

import { useEffect, useRef } from "react";
import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerTooltip,
  type MapRef,
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
  const mapRef = useRef<MapRef>(null);

  const located = houses.filter(hasCoords);

  // Fit map to all markers on first render
  useEffect(() => {
    if (located.length === 0 || !mapRef.current) return;

    if (located.length === 1) {
      mapRef.current.flyTo({
        center: [located[0].longitude, located[0].latitude],
        zoom: 13,
        duration: 0,
      });
      return;
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

    mapRef.current.fitBounds(
      [
        [minLon, minLat],
        [maxLon, maxLat],
      ],
      { padding: 60, maxZoom: 14, duration: 0 },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            ref={mapRef}
            className="h-full w-full"
            center={[located[0].longitude, located[0].latitude]}
            zoom={12}
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
