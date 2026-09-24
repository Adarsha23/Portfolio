import Image from "next/image";
import PeelBoard from "./PeelBoard";
import PeelVideo from "./PeelVideo";

const facts = [
  ["Platform", "macOS · AppKit · Swift 6"],
  ["Size", "~600 KB, one binary"],
  ["Dependencies", "0"],
  ["Network calls", "0"],
  ["License", "MIT"],
];

const shots = [
  { src: "/peel/ghost.png", w: 836, h: 654, caption: "Leave a sticky alone and it goes translucent, so what's underneath stays readable. Touch it, it's back." },
  { src: "/peel/sticky.png", w: 800, h: 700, caption: "Screenshots land inline where you drop them. Plain markdown on disk, styled in the editor." },
  { src: "/peel/search.png", w: 1180, h: 660, caption: "Search runs over note text, filenames, and the words inside your screenshots." },
];

const PANEL_SNIPPET = `let panel = NSPanel(
  contentRect: rect,
  styleMask: [.nonactivatingPanel,
              .fullSizeContentView],
  backing: .buffered, defer: false
)

// float above the fullscreen space
panel.level = .screenSaver
panel.collectionBehavior = [
  .canJoinAllSpaces,
  .fullScreenAuxiliary,
]

// take keys only while you're typing,
// hand them back the instant you leave
panel.becomesKeyOnlyIfNeeded = true
panel.hidesOnDeactivate = false`;

export default function Peel() {
  return (
    <section
      id="peel"
      tabIndex={-1}
      className="border-t-2 border-[var(--color-ink)] focus:outline-none"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h2 className="t-display text-[clamp(2.4rem,1.6rem+3vw,3.6rem)]">Peel</h2>
          <p className="text-[var(--color-ink-soft)] t-lead">
            Sticky notes that <span className="mark mark-draw">float over everything</span>. Even
            fullscreen video.
          </p>
        </div>
        <p className="mt-4 text-[var(--color-ink-soft)]">
          It&apos;s open source and free for any Mac user. About ten people use it every day so far,
          my teammates and a few friends I roped in, and they file real bug reports.
        </p>

        {/* the product, moving */}
        <div className="reveal mt-10">
          <PeelVideo />
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:gap-16">
          <div className="measure space-y-5 text-[1.1rem]">
            <p>
              You&apos;re watching something fullscreen and a thought shows up. Your options today:
              pause and open Notes like a caveman, scribble on paper, or pay a subscription for an app
              that still pauses your video when you click it. I wanted none of those, so I built Peel.
            </p>
            <p>
              Press <kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>Space</kbd>, a sticky appears over whatever
              you&apos;re doing, you type the thought, you click back, and the video never stopped
              playing. That one interaction is the whole reason it exists.
            </p>
          </div>

          <dl className="panel reveal grid grid-cols-2 gap-x-6 gap-y-4 self-start p-6 md:grid-cols-1">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className="data">{k}</dt>
                <dd className="mono mt-0.5 text-[0.95rem] text-[var(--color-ink)]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* hardest problem */}
        <div className="panel reveal mt-16 grid gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div>
            <p className="mb-3">
              <span className="kicker">The part that fought back</span>
            </p>
            <h3 className="font-[family-name:var(--font-display)] text-[1.4rem]">
              Taking your keystrokes without stealing focus
            </h3>
            <p className="mt-3 text-[var(--color-ink-soft)]">
              A normal window does one of two wrong things over fullscreen video: it steals focus (so
              your video pauses and drops out of fullscreen), or it can&apos;t take your keystrokes at
              all. I needed both at once, take keys while you type, hand them back the instant you
              leave. Peel&apos;s note is a non-activating{" "}
              <code className="text-[var(--color-ink)]">NSPanel</code> above the fullscreen space, with
              the first-responder handoff done by hand so the app underneath never notices it briefly
              lost focus. Making that feel instant, no flicker, no dropped keypress, took the most
              iteration of anything in the app.
            </p>
          </div>
          <pre className="mono overflow-x-auto rounded-lg border border-[var(--color-rule)] bg-[var(--color-night)] p-4 text-[0.78rem] leading-relaxed text-[var(--color-night-ink)]">
            <code>{PANEL_SNIPPET}</code>
          </pre>
        </div>

        {/* real screenshots — uniform cards */}
        <div className="reveal mt-14 grid gap-5 sm:grid-cols-3">
          {shots.map((s) => (
            <figure key={s.src} className="panel flex h-full flex-col overflow-hidden">
              <div className="aspect-[4/3] w-full overflow-hidden bg-[var(--color-night)]">
                <Image
                  src={s.src}
                  alt={s.caption}
                  width={s.w}
                  height={s.h}
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <figcaption className="flex-1 border-t-2 border-[var(--color-ink)] px-3 py-2.5 text-sm text-[var(--color-ink-soft)]">
                {s.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* play with it */}
        <div className="mt-16">
          <p className="bubble mb-6 max-w-md text-[0.98rem] text-[var(--color-ink)]">
            Can&apos;t run a Mac app in a browser, so here&apos;s the feel of it. Drag these around,
            or hit <kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>Space</kbd>.
          </p>
          <PeelBoard />
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="https://github.com/Adarsha23/peel"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-md border-2 border-[var(--color-ink)] bg-[var(--color-marker)] px-5 py-3 font-[family-name:var(--font-display)] tracking-wide text-[#1c1a17] shadow-[4px_4px_0_var(--color-ink)] transition-transform duration-150 hover:-translate-y-0.5"
          >
            Get Peel on GitHub
            <span aria-hidden="true">↗</span>
          </a>
          <a
            href="https://github.com/Adarsha23/peel#readme"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center border-b border-[var(--color-ink-mute)] py-2 text-[var(--color-ink-soft)] transition-colors duration-150 hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
          >
            Read the (very opinionated) README
          </a>
        </div>
      </div>
    </section>
  );
}
