"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type PhotonFeature = {
  type: "Feature";
  geometry: { type: "Point"; coordinates: [number, number] };
  properties: {
    name?: string;
    street?: string;
    housenumber?: string;
    postcode?: string;
    city?: string;
    state?: string;
    country?: string;
  };
};

type PhotonResponse = {
  type: "FeatureCollection";
  features: PhotonFeature[];
};

function formatSuggestion(f: PhotonFeature): string {
  const p = f.properties;
  const parts: string[] = [];
  if (p.name) parts.push(p.name);
  const street =
    p.housenumber && p.street
      ? `${p.street} ${p.housenumber}`
      : p.street ?? "";
  if (street) parts.push(street);
  if (p.postcode || p.city) {
    parts.push([p.postcode, p.city].filter(Boolean).join(" "));
  }
  if (p.state && p.state !== p.city) parts.push(p.state);
  if (p.country) parts.push(p.country);
  return parts.join(", ");
}

type AddressSuggestion = {
  label: string;
  lat: number;
  lng: number;
};

type Props = {
  id?: string;
  name?: string;
  placeholder?: string;
  defaultValue?: string;
  defaultLatitude?: number | null;
  defaultLongitude?: number | null;
};

export function AddressAutocomplete({
  id,
  name = "address",
  placeholder,
  defaultValue = "",
  defaultLatitude = null,
  defaultLongitude = null,
}: Props) {
  const [query, setQuery] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [lat, setLat] = useState<number | null>(defaultLatitude);
  const [lng, setLng] = useState<number | null>(defaultLongitude);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Whether the current text was confirmed by selecting a suggestion
  const confirmedRef = useRef(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch suggestions from Photon when query changes
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!query.trim() || confirmedRef.current) return;

    debounceRef.current = setTimeout(async () => {
      try {
        const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5`;
        const res = await fetch(url);
        if (!res.ok) return;
        const data: PhotonResponse = await res.json();
        const mapped = data.features.map((f) => ({
          label: formatSuggestion(f),
          lat: f.geometry.coordinates[1],
          lng: f.geometry.coordinates[0],
        }));
        setSuggestions(mapped);
        setOpen(mapped.length > 0);
        setActiveIndex(-1);
      } catch {
        // silently ignore network errors
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    confirmedRef.current = false;
    // Clear coordinates when the user manually changes the address text
    setLat(null);
    setLng(null);
    setQuery(e.target.value);
  }

  function selectSuggestion(s: AddressSuggestion) {
    confirmedRef.current = true;
    setQuery(s.label);
    setLat(s.lat);
    setLng(s.lng);
    setSuggestions([]);
    setOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      selectSuggestion(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <Input
        id={id}
        name={name}
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (suggestions.length > 0) setOpen(true);
        }}
        autoComplete="off"
        maxLength={200}
      />

      {/* Hidden inputs for coordinates */}
      <input
        type="hidden"
        name="latitude"
        value={lat !== null ? String(lat) : ""}
      />
      <input
        type="hidden"
        name="longitude"
        value={lng !== null ? String(lng) : ""}
      />

      {open && suggestions.length > 0 && (
        <ul
          role="listbox"
          className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-border bg-popover shadow-dropdown"
        >
          {suggestions.map((s, i) => (
            <li
              key={`${s.lat}-${s.lng}-${i}`}
              role="option"
              aria-selected={i === activeIndex}
              className={cn(
                "cursor-pointer px-3 py-2 text-sm text-popover-foreground",
                "hover:bg-accent hover:text-accent-foreground",
                i === activeIndex && "bg-accent text-accent-foreground",
              )}
              onMouseDown={(e) => {
                // prevent blur from closing before click fires
                e.preventDefault();
                selectSuggestion(s);
              }}
            >
              {s.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
