"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const APP_URL = "https://relayy-web.vercel.app";
const SANDBOX = "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox";

export default function RelayDemo() {
  const [launched, setLaunched] = useState(false);
  const preconnected = useRef(false);

  // Warm the connection the moment the user shows intent, before the click.
  const preconnect = () => {
    if (preconnected.current) return;
    preconnected.current = true;
    for (const rel of ["preconnect", "dns-prefetch"]) {
      const link = document.createElement("link");
      link.rel = rel;
      link.href = APP_URL;
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    }
  };

  return (
    <div className="on-night">
      <div className="overflow-hidden rounded-md border-2 border-[var(--color-ink)] bg-[var(--color-night)] shadow-[6px_6px_0_var(--color-ink)]">
        {/* window chrome */}
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </div>
          <p className="mono text-xs text-[var(--color-night-ink)]/70">
            {launched ? "two windows, one workspace" : "relayy-web.vercel.app"}
          </p>
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mono text-xs text-[var(--color-night-ink)]/70 underline-offset-2 hover:text-[var(--color-night-ink)] hover:underline"
          >
            new window ↗
          </a>
        </div>

        {!launched ? (
          <div className="relative aspect-[16/10] w-full sm:aspect-[16/8]">
            <Image
              src="/relay-preview.png"
              alt="The Relay issue tracker: issues grouped by status with an REL- key, priority, and assignee on each row."
              fill
              sizes="(max-width: 1024px) 100vw, 960px"
              className="object-cover object-top opacity-55"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[var(--color-night)]/75 px-6 text-center">
              <p className="max-w-md text-[var(--color-night-ink)]">
                Two live copies of Relay, side by side. Change one and watch the
                other update over a websocket.
              </p>
              <button
                type="button"
                onMouseEnter={preconnect}
                onFocus={preconnect}
                onClick={() => setLaunched(true)}
                className="rounded-lg bg-[var(--color-marker)] px-5 py-3 font-medium text-[var(--color-ink)] transition-transform duration-150 hover:-translate-y-0.5"
              >
                Launch the live demo
              </button>
              <p className="mono text-xs text-[var(--color-night-ink)]/60">
                loads the real app on click, not on page load
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* first-timer guide */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b-2 border-[var(--color-ink)] bg-[var(--color-marker)] px-4 py-2 text-sm text-[#1c1a17]">
              <span className="font-[family-name:var(--font-display)] tracking-wide">Try this →</span>
              <span><b>1.</b> open the same issue in both windows</span>
              <span aria-hidden="true">·</span>
              <span><b>2.</b> type or change a status in one</span>
              <span aria-hidden="true">·</span>
              <span><b>3.</b> watch it update in the other</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {(["Window A", "Window B"] as const).map((label, i) => (
                <div
                  key={label}
                  className={i === 0 ? "border-b border-white/10 md:border-b-0 md:border-r" : ""}
                >
                  <p className="mono px-3 py-1.5 text-xs text-[var(--color-night-ink)]/70">{label}</p>
                  <iframe
                    src={APP_URL}
                    title={`Relay live demo, ${label}`}
                    sandbox={SANDBOX}
                    referrerPolicy="strict-origin-when-cross-origin"
                    loading="eager"
                    className="h-[440px] w-full border-0 bg-[var(--color-night)] md:h-[520px]"
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {launched && (
        <p className="mt-3 text-sm text-[var(--color-ink-soft)]">
          Try it: press <kbd>C</kbd> to create an issue, or change a status in one
          window. It appears in the other with no refresh. Both windows share a
          workspace here; in Safari with strict cookie blocking, use{" "}
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-[var(--color-ink)]"
          >
            a real second window
          </a>
          .
        </p>
      )}
    </div>
  );
}
