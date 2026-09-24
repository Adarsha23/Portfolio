"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// The demo (and its facade image logic) load as you approach the section.
const RelayDemo = dynamic(() => import("./RelayDemo"), { ssr: false });

export default function RelayFrame() {
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
    <div ref={ref} style={show ? undefined : { minHeight: 480 }}>
      {show ? <RelayDemo /> : null}
    </div>
  );
}
