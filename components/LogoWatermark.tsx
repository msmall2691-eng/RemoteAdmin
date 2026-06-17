import Image from "next/image";

/**
 * Faint, decorative logo mark for a section background.
 * Wrap inside a `relative overflow-hidden` section. Position + size via className.
 */
export function LogoWatermark({
  className = "",
  size = "h-[28rem]",
}: {
  className?: string;
  size?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 opacity-[0.05] ${className}`}
    >
      <Image
        src="/tra-logo.png"
        alt=""
        width={445}
        height={446}
        className={`${size} w-auto`}
      />
    </div>
  );
}
