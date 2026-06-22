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
  MapPin,
  type LucideIcon,
} from "lucide-react";

/**
 * Small live-weather touch for Amherst, NH. Uses Open-Meteo (free, no API key,
 * CORS-friendly). Renders nothing until data is ready and nothing on failure,
 * so it never leaves an empty box in the footer.
 *
 * Note: api.open-meteo.com is allow-listed in the CSP connect-src.
 */

// Amherst, NH
const LAT = 42.8612;
const LON = -71.6226;
const URL =
  `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
  `&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min` +
  `&temperature_unit=fahrenheit&timezone=America/New_York&forecast_days=1`;

type Weather = {
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

export function WeatherWidget() {
  const [data, setData] = useState<Weather | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(URL);
        if (!res.ok) return;
        const json = await res.json();
        const code = Number(json?.current?.weather_code ?? 3);
        const { label, Icon } = describe(code);
        if (cancelled) return;
        setData({
          temp: Math.round(json.current.temperature_2m),
          hi: Math.round(json.daily.temperature_2m_max[0]),
          lo: Math.round(json.daily.temperature_2m_min[0]),
          label,
          Icon,
        });
      } catch {
        /* leave it hidden on failure */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!data) return null;
  const { Icon } = data;

  return (
    <div
      className="inline-flex items-center gap-2 rounded-pill border border-line bg-card/70 px-3.5 py-1.5 text-xs text-muted"
      title={`Current weather in Amherst, NH — ${data.label}, ${data.temp}°F (high ${data.hi}°, low ${data.lo}°)`}
    >
      <MapPin className="h-3.5 w-3.5 text-sage-deep" aria-hidden="true" />
      <span className="font-medium text-ink">Amherst, NH</span>
      <span aria-hidden="true">·</span>
      <Icon className="h-4 w-4 text-sage-deep" aria-hidden="true" />
      <span className="font-medium text-ink">{data.temp}°</span>
      <span>{data.label}</span>
      <span className="hidden sm:inline" aria-hidden="true">·</span>
      <span className="hidden sm:inline">
        H {data.hi}° · L {data.lo}°
      </span>
    </div>
  );
}
