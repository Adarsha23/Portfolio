"use client";

import { useSyncExternalStore } from "react";

// Shows ⌘ on Apple platforms, Ctrl elsewhere. Both are wired in the palette.
// useSyncExternalStore reads navigator without a hydration mismatch: the server
// snapshot is ⌘ (mac), the client corrects after mount if needed.
const subscribe = () => () => {};
const isMac = () =>
  /mac|iphone|ipad|ipod/i.test(navigator.platform || navigator.userAgent);

export default function ModKey() {
  const mac = useSyncExternalStore(subscribe, isMac, () => true);
  return <>{mac ? "⌘" : "Ctrl "}</>;
}
