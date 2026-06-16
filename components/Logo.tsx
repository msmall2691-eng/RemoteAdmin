/**
 * Custom logo mark — a tidy "stack" monogram (three settled sheets).
 * Echoes the Office Rescue "chaos → caught up" idea. Pure SVG, no asset needed.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      role="img"
      aria-label="The Remote Admin logo"
      fill="none"
    >
      <rect width="40" height="40" rx="10" fill="rgb(var(--ink))" />
      <rect x="11" y="11" width="18" height="3.4" rx="1.7" fill="rgb(var(--oat))" />
      <rect x="11" y="18.3" width="18" height="3.4" rx="1.7" fill="rgb(var(--sage))" />
      <rect x="11" y="25.6" width="11" height="3.4" rx="1.7" fill="rgb(var(--brass))" />
    </svg>
  );
}
