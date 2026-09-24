import type { CSSProperties } from "react";
import Image from "next/image";
import Socials from "./Socials";
import OpenPaletteButton from "./OpenPaletteButton";
import ModKey from "./ModKey";

export default function Hero() {
  return (
    <section
      id="top"
      tabIndex={-1}
      className="relative overflow-hidden px-5 pt-28 pb-16 focus:outline-none sm:px-8 sm:pt-32"
    >
      <div className="hero-glow" aria-hidden="true" />
      <div
        className="halftone pointer-events-none absolute -right-16 -top-10 h-72 w-72 opacity-30 [mask-image:radial-gradient(circle,black,transparent_68%)]"
        aria-hidden="true"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        {/* left: the pitch */}
        <div className="relative">
          <span
            aria-hidden="true"
            className="starburst absolute -top-2 right-0 z-10 h-24 w-24 text-[0.7rem] tracking-wide sm:h-28 sm:w-28 sm:text-[0.8rem] lg:-right-4"
          >
            OPEN TO WORK!
          </span>
          <span className="kicker">Full-stack dev · Technical PM</span>
          <h1 className="t-display mt-5">Adarsha Prasai</h1>
          <p className="measure mt-5 text-[1.2rem] leading-snug">
            I build tools I actually use, ship them finished, and blast metal doing
            it. Also: I sing, and I read too many comics.
          </p>

          <Socials className="mt-6 -ml-2.5" />

          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3">
            <OpenPaletteButton
              aria-label="Open command palette"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md border-2 border-[var(--color-ink)] bg-[var(--color-marker)] px-4 py-2 font-[family-name:var(--font-display)] tracking-wide text-[var(--color-ink)] shadow-[3px_3px_0_var(--color-ink)] transition-transform duration-150 hover:-translate-y-0.5"
            >
              Jump anywhere
              <kbd>
                <ModKey />K
              </kbd>
            </OpenPaletteButton>
            <a
              href="#peel"
              className="min-h-[44px] py-2 font-[family-name:var(--font-display)] tracking-wide text-[var(--color-ink-soft)] transition-colors duration-150 hover:text-[var(--color-ink)]"
            >
              or see what I built ↓
            </a>
          </div>
        </div>

        {/* right: the comic (his ask) */}
        <figure
          className="panel overflow-hidden justify-self-center"
          style={{ transform: "rotate(1.6deg)" } as CSSProperties}
        >
          <Image
            src="/me/comic-bw.jpg"
            alt="A nine-panel comic of Adarsha battling a critical bug at 3am, tracing it to the pointer arithmetic, and shipping the fix by morning."
            width={760}
            height={764}
            priority
            sizes="(max-width: 1024px) 92vw, 480px"
            className="h-auto w-full"
          />
        </figure>
      </div>

      <span
        aria-hidden="true"
        className="mt-12 block text-center font-[family-name:var(--font-display)] tracking-widest text-[var(--color-ink-mute)]"
      >
        scroll
      </span>
    </section>
  );
}
