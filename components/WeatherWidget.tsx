"use client";

import { MapPin } from "lucide-react";
import { useWeather } from "./useWeather";

/**
 * Compact weather chip for Amherst, NH (used in the top utility bar).
 * Renders nothing until data is ready / on failure, so it never leaves a gap.
 */
export function WeatherWidget() {
  const data = useWeather();
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
