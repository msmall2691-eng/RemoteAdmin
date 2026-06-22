"use client";

import { useEffect, useState } from "react";
import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  type LucideIcon,
} from "lucide-react";

/**
 * Shared live-weather data for Amherst, NH (Open-Meteo, free, no API key).
 * A module-level cache means multiple widgets (hero card, top bar) trigger a
 * single network request. api.open-meteo.com is allow-listed in the CSP.
 */

// Amherst, NH
const LAT = 42.8612;
const LON = -71.6226;
const URL =
  `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
  `&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min` +
  `&temperature_unit=fahrenheit&timezone=America/New_York&forecast_days=1`;

export type Weather = {
  temp: number;
  hi: number;
  lo: number;
  label: string;
  Icon: LucideIcon;
};

// Map WMO weather codes to a short label + icon.
function describe(code: number): { label: string; Icon: LucideIcon } {
  if (code === 0) return { label: "Clear", Icon: Sun };
  if (code <= 2) return { label: "Partly cloudy", Icon: CloudSun };
  if (code === 3) return { label: "Cloudy", Icon: Cloud };
  if (code <= 48) return { label: "Fog", Icon: CloudFog };
  if (code <= 57) return { label: "Drizzle", Icon: CloudDrizzle };
  if (code <= 67) return { label: "Rain", Icon: CloudRain };
  if (code <= 77) return { label: "Snow", Icon: CloudSnow };
  if (code <= 82) return { label: "Showers", Icon: CloudRain };
  if (code <= 86) return { label: "Snow showers", Icon: CloudSnow };
  return { label: "Thunderstorm", Icon: CloudLightning };
}

let cache: Weather | null = null;
let inflight: Promise<Weather | null> | null = null;

async function load(): Promise<Weather | null> {
  try {
    const res = await fetch(URL);
    if (!res.ok) return null;
    const json = await res.json();
    const code = Number(json?.current?.weather_code ?? 3);
    const { label, Icon } = describe(code);
    cache = {
      temp: Math.round(json.current.temperature_2m),
      hi: Math.round(json.daily.temperature_2m_max[0]),
      lo: Math.round(json.daily.temperature_2m_min[0]),
      label,
      Icon,
    };
    return cache;
  } catch {
    return null;
  }
}

export function useWeather(): Weather | null {
  const [data, setData] = useState<Weather | null>(cache);

  useEffect(() => {
    if (cache) {
      setData(cache);
      return;
    }
    let cancelled = false;
    inflight ??= load();
    inflight.then((d) => {
      if (!cancelled) setData(d);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}
