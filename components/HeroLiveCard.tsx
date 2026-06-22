"use client";

import { MapPin } from "lucide-react";
import { useWeather } from "./useWeather";
import { ThemeSwitcher } from "./ThemeSwitcher";

/**
 * Hero "LIVE" card — a small live-data touch in the hero: current Amherst, NH
 * weather plus a quick theme picker visitors can try. Styled to match the
 * site's light brand (not the dark terminal look of the studio reference).
 */
export function HeroLiveCard() {
  const data = useWeather();
  const Icon = data?.Icon;

  return (
    <div className="rounded-card border border-line bg-card/80 p-4 shadow-sm backdrop-blur-sm">
      {/* LIVE + location */}
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-sage-deep">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-sage-deep" />
        </span>
        Live
        <span className="text-muted" aria-hidden="true">
          ·
        </span>
        <span className="inline-flex items-center gap-1 normal-case tracking-normal text-muted">
          <MapPin className="h-3.5 w-3.5" />
          Amherst, NH
        </span>
      </div>

      {/* Weather line */}
      <div className="mt-2.5 flex items-center gap-2 font-mono text-sm text-ink">
        {data && Icon ? (
          <>
            <Icon className="h-4 w-4 text-sage-deep" aria-hidden="true" />
            <span className="font-semibold">{data.temp}°F</span>
            <span className="text-muted">{data.label}</span>
            <span className="text-muted" aria-hidden="true">
              ·
            </span>
            <span className="text-muted">
              H {data.hi}° · L {data.lo}°
            </span>
          </>
        ) : (
          <span className="text-muted">Checking local conditions…</span>
        )}
      </div>

      {/* Theme picker */}
      <div className="mt-3 flex items-center gap-3 border-t border-line pt-3">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Theme
        </span>
        <ThemeSwitcher variant="inline" />
        <span className="text-xs text-muted">try it</span>
      </div>
    </div>
  );
}
