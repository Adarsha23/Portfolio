import OpenPaletteButton from "./OpenPaletteButton";
import ModKey from "./ModKey";

const links = [
  { href: "#peel", label: "Peel" },
  { href: "#relay", label: "Relay" },
  { href: "#corpsec", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b-2 border-[var(--color-ink)] bg-[var(--color-paper)]">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a
          href="#top"
          className="font-[family-name:var(--font-display)] text-[1.35rem] tracking-wide"
        >
          Adarsha Prasai
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-[family-name:var(--font-display)] tracking-wide text-[var(--color-ink-soft)] transition-colors duration-150 hover:text-[var(--color-ink)]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* the palette doubles as mobile nav */}
        <OpenPaletteButton
          aria-label="Open command palette to navigate"
          className="flex min-h-[44px] items-center gap-2 rounded-md border-2 border-[var(--color-ink)] bg-[var(--color-paper-2)] py-1 pl-3 pr-2 text-sm text-[var(--color-ink-soft)] shadow-[2px_2px_0_var(--color-ink)] transition-colors duration-150 hover:text-[var(--color-ink)]"
        >
          <span className="hidden font-[family-name:var(--font-display)] tracking-wide sm:inline">
            Jump to…
          </span>
          <span className="font-[family-name:var(--font-display)] tracking-wide sm:hidden">Menu</span>
          <kbd className="text-[var(--color-ink)]">
            <ModKey />K
          </kbd>
        </OpenPaletteButton>
      </div>
    </header>
  );
}
