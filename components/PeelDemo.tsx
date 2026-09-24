"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Note = {
  id: number;
  x: number;
  y: number;
  rot: number;
  bg: string;
  title?: string;
  body: string;
};

const SHADES = ["#ffd98a", "#ffe4a0", "#fbf8f2", "#ffd23f"];

// Seeded notes double as the feature list — each note explains a real Peel trait.
const SEED: Omit<Note, "id">[] = [
  { x: 24, y: 28, rot: -3, bg: "#ffd23f", title: "⌘⇧Space", body: "Drops a sticky over anything on screen, even fullscreen video. It never steals focus from what's underneath." },
  { x: 250, y: 60, rot: 2.5, bg: "#ffe4a0", title: "Plain markdown", body: "Every note is a markdown file with readable frontmatter, auto-committed to a local git repo every 6 hours." },
  { x: 70, y: 190, rot: 1.5, bg: "#fbf8f2", title: "On-device OCR", body: "Paste a screenshot and Apple Vision reads the text. `peel search` finds the note by the words inside the image. Nothing leaves the Mac." },
  { x: 320, y: 210, rot: -2, bg: "#ffd98a", title: "Reminders", body: "Fire through Do Not Disturb and survive being away from the machine." },
];

const NUDGE = 16; // px per arrow key — the non-pointer path for WCAG 2.5.7
const MAX_NOTES = 8;

export default function PeelDemo() {
  const boardRef = useRef<HTMLDivElement>(null);
  const [notes, setNotes] = useState<Note[]>(() => SEED.map((n, i) => ({ ...n, id: i })));
  const [announce, setAnnounce] = useState("");
  const zTop = useRef(10);
  const nextId = useRef(SEED.length);
  const idlePop = useRef(0);

  // live drag state, kept in a ref so pointermove never re-renders React
  const drag = useRef<{
    id: number;
    el: HTMLElement;
    offX: number;
    offY: number;
    rot: number;
    x: number;
    y: number;
    raf: number | null;
  } | null>(null);

  const clamp = (x: number, y: number) => {
    const board = boardRef.current;
    if (!board) return { x, y };
    const maxX = board.clientWidth - 180;
    const maxY = board.clientHeight - 120;
    return { x: Math.max(0, Math.min(x, maxX)), y: Math.max(0, Math.min(y, maxY)) };
  };

  const bringToFront = (el: HTMLElement) => {
    zTop.current += 1;
    el.style.zIndex = String(zTop.current);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>, note: Note) => {
    if (e.button && e.button !== 0) return;
    const el = e.currentTarget;
    el.setPointerCapture(e.pointerId);
    bringToFront(el);
    el.style.willChange = "transform";
    el.dataset.dragging = "true";
    drag.current = {
      id: note.id,
      el,
      offX: e.clientX - note.x,
      offY: e.clientY - note.y,
      rot: note.rot,
      x: note.x,
      y: note.y,
      raf: null,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || !e.currentTarget.hasPointerCapture(e.pointerId)) return;
    const { x, y } = clamp(e.clientX - d.offX, e.clientY - d.offY);
    d.x = x;
    d.y = y;
    if (d.raf == null) {
      d.raf = requestAnimationFrame(() => {
        d.raf = null;
        d.el.style.transform = `translate3d(${d.x}px, ${d.y}px, 0) rotate(${d.rot}deg) scale(var(--pop, 1))`;
      });
    }
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    if (d.raf != null) cancelAnimationFrame(d.raf);
    d.el.style.willChange = "";
    delete d.el.dataset.dragging;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* nothing to release */
    }
    setNotes((prev) => prev.map((n) => (n.id === d.id ? { ...n, x: d.x, y: d.y } : n)));
    drag.current = null;
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, note: Note) => {
    const dir: Record<string, [number, number]> = {
      ArrowLeft: [-NUDGE, 0],
      ArrowRight: [NUDGE, 0],
      ArrowUp: [0, -NUDGE],
      ArrowDown: [0, NUDGE],
    };
    if (dir[e.key]) {
      e.preventDefault();
      bringToFront(e.currentTarget);
      const [dx, dy] = dir[e.key];
      setNotes((prev) =>
        prev.map((n) => {
          if (n.id !== note.id) return n;
          const p = clamp(n.x + dx, n.y + dy);
          return { ...n, ...p };
        }),
      );
      setAnnounce(`Moved “${note.title ?? "note"}”.`);
    }
  };

  const spawn = useCallback((fromShortcut = false) => {
    setNotes((prev) => {
      if (prev.length >= MAX_NOTES) {
        setAnnounce("The board is full. Clear it to drop more.");
        return prev;
      }
      const id = nextId.current++;
      idlePop.current = (idlePop.current + 1) % SHADES.length;
      const note: Note = {
        id,
        x: 90 + ((id * 37) % 160),
        y: 70 + ((id * 53) % 120),
        rot: (id % 2 ? 1 : -1) * (1 + (id % 3)),
        bg: SHADES[idlePop.current],
        body: fromShortcut ? "Dropped with ⌘⇧Space, the way Peel really works." : "A fresh note. Drag me around.",
      };
      return [...prev, note];
    });
    setAnnounce("New note dropped.");
  }, []);

  const reset = () => {
    setNotes(SEED.map((n, i) => ({ ...n, id: i })));
    nextId.current = SEED.length;
    setAnnounce("Board reset.");
  };

  // The real Peel shortcut. Scrolls the board into view if needed, then drops.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey && e.shiftKey && (e.code === "Space" || e.key === " ")) {
        e.preventDefault();
        boardRef.current?.scrollIntoView({ block: "center" });
        spawn(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [spawn]);

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[var(--color-ink-soft)]">
          Drag the notes. Or press{" "}
          <kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>Space</kbd> to drop one, like the app does.
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => spawn(false)}
            className="min-h-[44px] rounded-md border border-[var(--color-rule)] bg-[var(--color-paper-2)] px-4 text-sm transition-colors duration-150 hover:border-[var(--color-ink-mute)]"
          >
            Drop a note
          </button>
          <button
            type="button"
            onClick={reset}
            className="min-h-[44px] rounded-md px-3 text-sm text-[var(--color-ink-soft)] transition-colors duration-150 hover:text-[var(--color-ink)]"
          >
            Reset
          </button>
        </div>
      </div>

      <div
        ref={boardRef}
        className="peel-board relative h-[380px] w-full touch-pan-y overflow-hidden rounded-xl border border-[var(--color-rule)]"
        role="group"
        aria-label="A board of draggable sticky notes"
      >
        {notes.map((note) => (
          <div
            key={note.id}
            data-note
            tabIndex={0}
            role="button"
            aria-roledescription="Draggable sticky note"
            aria-label={`${note.title ? note.title + ": " : ""}${note.body}. Use arrow keys to move.`}
            onPointerDown={(e) => onPointerDown(e, note)}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onKeyDown={(e) => onKeyDown(e, note)}
            style={{
              transform: `translate3d(${note.x}px, ${note.y}px, 0) rotate(${note.rot}deg) scale(var(--pop, 1))`,
              background: note.bg,
            }}
            className="peel-note absolute left-0 top-0 w-[168px] cursor-grab touch-none select-none rounded-[3px] p-3.5 text-[#1c1a17] active:cursor-grabbing"
          >
            {note.title && (
              <p className="mb-1 font-[family-name:var(--font-display)] text-[0.95rem] font-medium">
                {note.title}
              </p>
            )}
            <p className="text-[0.82rem] leading-snug">{note.body}</p>
          </div>
        ))}
      </div>

      <div role="status" aria-live="polite" className="sr-only">
        {announce}
      </div>
    </div>
  );
}
