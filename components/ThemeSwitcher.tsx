"use client";

import { useEffect, useRef, useState } from "react";
import { Palette, Check } from "lucide-react";

/**
 * Visitor-facing theme picker. Swaps the site's color palette by setting a
 * `data-theme` attribute on <html> (see globals.css) and remembers the choice
 * in localStorage. Themes are NH/New England flavored so the site feels local.
 */

type Theme = {
  id: string;
  label: string;
  desc: string;
  swatch: string;
};

const THEMES: Theme[] = [
  { id: "granite", label: "Granite", desc: "Classic NH blue", swatch: "#3a6096" },
  { id: "foliage", label: "Foliage", desc: "Autumn in NH", swatch: "#9e4226" },
  { id: "lakeside", label: "Lakeside", desc: "Lake country teal", swatch: "#10687a" },
  { id: "evergreen", label: "Evergreen", desc: "White Mountain pine", swatch: "#2f6b43" },
];

const STORAGE_KEY = "tra-theme";

function applyTheme(id: string) {
  const el = document.documentElement;
  if (id === "granite") el.removeAttribute("data-theme");
  else el.setAttribute("data-theme", id);
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    /* ignore (private mode, etc.) */
  }
}

export function ThemeSwitcher({
  className = "",
  variant = "popover",
}: {
  className?: string;
  variant?: "popover" | "inline";
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("granite");
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // Sync to whatever the no-flash inline script already applied.
  useEffect(() => {
    const current =
      document.documentElement.getAttribute("data-theme") || "granite";
    setActive(current);
  }, []);

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function choose(id: string) {
    applyTheme(id);
    setActive(id);
    setOpen(false);
  }

  // Inline variant: a row of swatches (no popover) — used inside the mobile
  // menu, which clips overflow during its open/close animation.
  if (variant === "inline") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {THEMES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => choose(t.id)}
            aria-pressed={active === t.id}
            aria-label={`${t.label} theme — ${t.desc}`}
            title={t.label}
            className={`h-7 w-7 rounded-full border border-black/10 transition-transform hover:scale-110 ${
              active === t.id ? "ring-2 ring-sage ring-offset-1" : ""
            }`}
            style={{ backgroundColor: t.swatch }}
          />
        ))}
      </div>
    );
  }

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Change site theme"
        className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-all hover:scale-110 hover:bg-mist/60 hover:text-ink"
      >
        <Palette className="h-[1.15rem] w-[1.15rem]" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-60 origin-top-right rounded-card border border-line bg-card p-2 shadow-lg"
        >
          <p className="px-2 pb-1.5 pt-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            Pick a theme
          </p>
          {THEMES.map((t) => {
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="menuitemradio"
                aria-checked={isActive}
                onClick={() => choose(t.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors ${
                  isActive ? "bg-mist/60" : "hover:bg-mist/40"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="h-6 w-6 shrink-0 rounded-full border border-black/10 shadow-sm"
                  style={{ backgroundColor: t.swatch }}
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-ink">
                    {t.label}
                  </span>
                  <span className="block text-xs text-muted">{t.desc}</span>
                </span>
                {isActive && (
                  <Check className="h-4 w-4 shrink-0 text-sage-deep" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
