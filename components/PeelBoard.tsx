"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// The board's JS only loads as you approach it, keeping first paint light.
const PeelDemo = dynamic(() => import("./PeelDemo"), { ssr: false });

export default function PeelBoard() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={show ? undefined : { minHeight: 440 }}>
      {show ? <PeelDemo /> : null}
    </div>
  );
}
