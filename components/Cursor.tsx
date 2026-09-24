"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = 'a,button,[role="button"],input,textarea,summary,label,[data-cursor="grab"]';

export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    document.body.classList.add("has-custom-cursor");
    let rx = window.innerWidth / 2;
    let ry = window.innerHeight / 2;
    let mx = rx;
    let my = ry;
    let parked = false;
    let raf = 0;

    // where the ring parks while you're inside an embed: by the search box
    const parkPos = () => ({ x: window.innerWidth - 58, y: 30 });

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${mx}px, ${my}px)`;
    };
    const loop = () => {
      const tx = parked ? parkPos().x : mx;
      const ty = parked ? parkPos().y : my;
      rx += (tx - rx) * (parked ? 0.14 : 0.2);
      ry += (ty - ry) * (parked ? 0.14 : 0.2);
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    const over = (e: Event) => {
      const t = e.target as Element;
      if (t?.tagName === "IFRAME") {
        parked = true;
        document.body.classList.add("cursor-parked");
        ring.current?.classList.remove("is-hover", "is-down");
        return;
      }
      if (t?.closest?.(INTERACTIVE)) ring.current?.classList.add("is-hover");
    };
    const out = (e: Event) => {
      const t = e.target as Element;
      if (t?.tagName === "IFRAME") {
        parked = false;
        document.body.classList.remove("cursor-parked");
        return;
      }
      if (t?.closest?.(INTERACTIVE)) ring.current?.classList.remove("is-hover");
    };
    const down = () => !parked && ring.current?.classList.add("is-down");
    const up = () => ring.current?.classList.remove("is-down");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.body.classList.remove("has-custom-cursor", "cursor-parked");
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
