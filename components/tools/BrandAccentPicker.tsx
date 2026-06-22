"use client";

import { ArrowUp } from "lucide-react";
import { labelClass, inputClass, CopyButton, ToolCta } from "./ui";

type Props = {
  accent: string;
  setAccent: (hex: string) => void;
};

const PRESETS: { label: string; hex: string }[] = [
  { label: "Professional Blue", hex: "#2D4A7A" },
  { label: "Fresh Green", hex: "#2F6B43" },
  { label: "Warm Coral", hex: "#D9603F" },
  { label: "Calm Teal", hex: "#13808C" },
  { label: "Soft Gold", hex: "#C79A3E" },
  { label: "Classic Gray", hex: "#56616E" },
];

export function BrandAccentPicker({ accent, setAccent }: Props) {
  const a = accent;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Controls */}
      <div className="space-y-5">
        <div>
          <span className={labelClass}>Brand moods</span>
          <div className="mt-2 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {PRESETS.map((p) => {
              const isActive = a.toLowerCase() === p.hex.toLowerCase();
              return (
                <button
                  key={p.hex}
                  type="button"
                  onClick={() => setAccent(p.hex)}
                  aria-pressed={isActive}
                  className={`flex items-center gap-2.5 rounded-xl border bg-card px-3 py-2.5 text-left text-sm transition-all ${
                    isActive
                      ? "border-sage ring-2 ring-sage/40"
                      : "border-line hover:border-sage"
                  }`}
                >
                  <span
                    className="h-6 w-6 shrink-0 rounded-full border border-black/10"
                    style={{ backgroundColor: p.hex }}
                    aria-hidden="true"
                  />
                  <span className="leading-tight text-ink">{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="accent-custom">
            Custom color
          </label>
          <div className="mt-1.5 flex items-center gap-2">
            <input
              id="accent-custom"
              type="color"
              value={a}
              onChange={(e) => setAccent(e.target.value)}
              className="h-11 w-14 cursor-pointer rounded-lg border border-line bg-oat"
              aria-label="Custom accent color"
            />
            <input
              type="text"
              value={a}
              onChange={(e) => setAccent(e.target.value)}
              className={inputClass}
            />
            <CopyButton text={a} label="Copy HEX" />
          </div>
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-sage-deep">
            <ArrowUp className="h-3.5 w-3.5" />
            This color carries into the Email Signature Generator above.
          </p>
        </div>
      </div>

      {/* Live preview of where the color shows up */}
      <div>
        <span className={labelClass}>Where it shows up</span>
        <div className="mt-1.5 space-y-5 rounded-card border border-line bg-white p-6">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Heading
            </p>
            <h4
              className="font-display text-2xl font-semibold"
              style={{ color: a }}
            >
              Your business, beautifully organized
            </h4>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Button
            </p>
            <button
              type="button"
              className="mt-1 rounded-lg px-4 py-2 text-sm font-semibold text-white"
              style={{ backgroundColor: a }}
            >
              Request a Quote
            </button>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Invoice accent
            </p>
            <div
              className="mt-1 rounded-md bg-gray-50 p-3"
              style={{ borderLeft: `4px solid ${a}` }}
            >
              <div className="flex justify-between text-sm text-gray-700">
                <span>Invoice #1042</span>
                <span style={{ color: a }} className="font-semibold">
                  $1,250.00
                </span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Email signature link
            </p>
            <p className="mt-1 text-sm text-gray-700">
              Visit{" "}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{ color: a }}
                className="font-medium underline"
              >
                yourbusiness.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2">
        <ToolCta>
          Want your forms, invoices, and client emails to look more
          professional? Ask about Admin Rescue Packages.
        </ToolCta>
      </div>
    </div>
  );
}
