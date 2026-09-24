"use client";

import { useEffect, useRef, useState } from "react";

export default function PeelVideo() {
  const v = useRef<HTMLVideoElement>(null);
  const [sound, setSound] = useState(false);

  useEffect(() => {
    const el = v.current;
    if (!el) return;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.play().catch(() => {});
    }
  }, []);

  const playWithSound = () => {
    const el = v.current;
    if (!el) return;
    el.muted = false;
    el.controls = true;
    el.currentTime = 0;
    el.play().catch(() => {});
    setSound(true);
  };

  return (
    <div className="relative overflow-hidden rounded-md border-2 border-[var(--color-ink)] bg-[var(--color-night)] shadow-[5px_5px_0_var(--color-ink)]">
      {/* the 1080p tour, muted loop until you ask for sound */}
      <video
        ref={v}
        muted
        loop
        playsInline
        preload="metadata"
        poster="/peel/hero-fullscreen.jpg"
        className="block w-full"
      >
        <source src="/peel/peel-brag.mp4" type="video/mp4" />
      </video>
      {!sound && (
        <button
          type="button"
          onClick={playWithSound}
          className="absolute bottom-3 right-3 rounded-full bg-[var(--color-marker)] px-4 py-2 text-sm font-medium text-[#1c1a17] transition-transform duration-150 hover:-translate-y-0.5"
        >
          ▶ Play with sound (deadpan voiceover included)
        </button>
      )}
    </div>
  );
}
