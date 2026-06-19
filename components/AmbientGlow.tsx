/**
 * Subtle, slow-drifting brand glows for a section background.
 * Decorative only (aria-hidden); reduced-motion disables the drift.
 * Wrap in a `relative overflow-hidden` section.
 */
export function AmbientGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="animate-drift absolute -left-24 top-0 h-64 w-64 rounded-full bg-sage/10 blur-3xl" />
      <div
        className="animate-drift absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-brass/10 blur-3xl"
        style={{ animationDelay: "-8s" }}
      />
    </div>
  );
}
