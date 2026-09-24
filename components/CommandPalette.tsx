"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { commands, type Command } from "./commands";

function match(cmd: Command, q: string) {
  if (!q) return true;
  const hay = `${cmd.label} ${cmd.keywords ?? ""}`.toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => hay.includes(term));
}

export default function CommandPalette() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  const results = useMemo(() => commands.filter((c) => match(c, query)), [query]);

  const openPalette = useCallback(() => {
    const dlg = dialogRef.current;
    if (!dlg || dlg.open) return;
    setQuery("");
    setActive(0);
    setOpen(true);
    dlg.showModal();
    // focus the input after the dialog paints
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  const closePalette = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  // Native <dialog> restores focus to the trigger on close for free.
  const run = useCallback(
    (cmd: Command) => {
      closePalette();
      if (cmd.kind === "external") {
        window.open(cmd.target, "_blank", "noopener,noreferrer");
      } else if (cmd.kind === "mailto") {
        window.location.href = `mailto:${cmd.target}`;
      } else {
        const el = document.getElementById(cmd.target);
        if (el) {
          el.scrollIntoView({ block: "start" });
          // Move keyboard focus to the section so Tab continues from there.
          (el as HTMLElement).focus({ preventScroll: true });
        }
      }
    },
    [closePalette],
  );

  // Global open shortcut + programmatic open from buttons.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (dialogRef.current?.open) closePalette();
        else openPalette();
      }
    };
    const onOpen = () => openPalette();
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, [openPalette, closePalette]);

  // active resets to 0 on every query change, so it never falls out of range.
  // Scroll the active option into view whenever it moves.
  useEffect(() => {
    const id = results[active]?.id;
    if (id) document.getElementById(`cmdk-opt-${id}`)?.scrollIntoView({ block: "nearest" });
  }, [active, results]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(results.length - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = results[active];
      if (cmd) run(cmd);
    }
  };

  const activeId = results[active] ? `cmdk-opt-${results[active].id}` : undefined;
  const groups: Command["group"][] = ["Go to", "Links"];

  return (
    <dialog
      ref={dialogRef}
      className="cmdk"
      aria-label="Command palette"
      onClose={() => setOpen(false)}
      // click on the ::backdrop (the dialog element itself) closes it
      onClick={(e) => {
        if (e.target === dialogRef.current) closePalette();
      }}
    >
      {open && (
        <div className="flex flex-col max-h-[70vh]">
          <div className="flex items-center gap-3 border-b border-[var(--color-rule)] px-4">
            <SearchGlyph />
            <input
              ref={inputRef}
              type="text"
              role="combobox"
              autoComplete="off"
              spellCheck={false}
              aria-expanded
              aria-controls="cmdk-listbox"
              aria-activedescendant={activeId}
              aria-autocomplete="list"
              aria-label="Search for a section or link"
              placeholder="Jump to a section or link…"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={onInputKey}
              className="w-full bg-transparent py-4 text-[1.05rem] text-[var(--color-ink)] placeholder:text-[var(--color-ink-mute)] focus:outline-none"
            />
            <kbd aria-hidden="true">Esc</kbd>
          </div>

          <ul
            ref={listRef}
            id="cmdk-listbox"
            role="listbox"
            aria-label="Results"
            className="overflow-y-auto py-2"
          >
            {results.length === 0 && (
              <li className="px-4 py-6 text-center text-[var(--color-ink-soft)]">
                Nothing matches “{query}”.
              </li>
            )}
            {groups.map((group) => {
              const items = results.filter((c) => c.group === group);
              if (items.length === 0) return null;
              return (
                <li key={group} className="mb-1">
                  <div className="px-4 pt-2 pb-1 data" aria-hidden="true">
                    {group}
                  </div>
                  <ul>
                    {items.map((cmd) => {
                      const idx = results.indexOf(cmd);
                      const isActive = idx === active;
                      return (
                        <li
                          key={cmd.id}
                          id={`cmdk-opt-${cmd.id}`}
                          role="option"
                          aria-selected={isActive}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            run(cmd);
                          }}
                          onMouseMove={() => setActive(idx)}
                          className={`mx-2 flex cursor-pointer items-center justify-between gap-4 rounded-md px-3 py-2.5 ${
                            isActive ? "bg-[var(--color-marker)] text-[#1c1a17]" : ""
                          }`}
                        >
                          <span className="truncate">{cmd.label}</span>
                          {cmd.hint && (
                            <span className="mono shrink-0 text-sm text-[var(--color-ink-soft)]">
                              {cmd.hint}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>

          <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
            {query === ""
              ? ""
              : results.length === 0
                ? "No results found"
                : `${results.length} result${results.length === 1 ? "" : "s"} available`}
          </div>
        </div>
      )}
    </dialog>
  );
}

function SearchGlyph() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="shrink-0 text-[var(--color-ink-soft)]"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </svg>
  );
}
