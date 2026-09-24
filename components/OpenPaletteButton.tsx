"use client";

export default function OpenPaletteButton({
  className,
  children,
  "aria-label": ariaLabel,
}: {
  className?: string;
  children: React.ReactNode;
  "aria-label"?: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel ?? "Open command palette"}
      aria-keyshortcuts="Meta+K Control+K"
      onClick={() => window.dispatchEvent(new CustomEvent("open-palette"))}
      className={className}
    >
      {children}
    </button>
  );
}
