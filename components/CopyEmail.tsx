"use client";

import { useEffect, useRef, useState } from "react";

const EMAIL = "prasaiadarsha@gmail.com";

export default function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard blocked — the mailto link beside this still works.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-[44px] items-center gap-1.5 px-1 text-sm text-[var(--color-ink-soft)] transition-colors duration-150 hover:text-[var(--color-ink)]"
    >
      <span aria-hidden="true" className="w-4">
        {copied ? <Check /> : <CopyIcon />}
      </span>
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

function CopyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </svg>
  );
}

function Check() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-live-ink)]">
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}
