import RelayFrame from "./RelayFrame";

const steps = [
  ["You change a status", "The click patches the local cache right away with an optimistic update, so the screen changes before the network answers."],
  ["The server writes it", "The mutation runs on Convex and writes to the database, the single source of truth. updatedAt is stamped on the server, not the client."],
  ["Every client hears it", "Convex re-runs each query the write touched and pushes fresh results down the websocket to every subscriber, including you, replacing the optimistic value with the confirmed one. Nothing polls."],
];

const keys = [
  ["⌘K", "command palette"],
  ["j / k", "move"],
  ["c", "create"],
  ["/", "search"],
  ["Esc", "close"],
];

const stack = ["Next.js 16", "React 19", "TypeScript", "Convex", "Tailwind 4", "shadcn"];

const ROLLBACK_SNIPPET = `// change status instantly,
// roll back if the server says no
await updateIssue({ id, status })
  .withOptimisticUpdate((store) => {
    const list = store.getQuery(
      api.issues.list, {}
    )
    store.setQuery(api.issues.list, {},
      list.map(i =>
        i._id === id ? { ...i, status } : i
      )
    )
    // rejected? Convex restores the old
    // list and the UI snaps back to truth
  })`;

export default function Relay() {
  return (
    <section
      id="relay"
      tabIndex={-1}
      className="border-t-2 border-[var(--color-ink)] focus:outline-none"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h2 className="t-display text-[clamp(2.4rem,1.6rem+3vw,3.6rem)]">Relay</h2>
          <p className="text-[var(--color-ink-soft)] t-lead">
            A real-time issue tracker you drive from the keyboard
          </p>
        </div>

        <p className="measure mt-8 text-[1.1rem]">
          Relay looks like a Linear-lite issue tracker. The real project is{" "}
          <span className="mark mark-draw">the sync engine underneath</span>. Every create, edit, and
          delete reaches every open client over a websocket, with live presence, optimistic updates
          that roll back on rejection, and an offline queue that reconciles on reconnect. CRUD is the
          easy part. The interesting part is what one edit does after you let go of it.
        </p>

        {/* the live demo */}
        <div className="mt-12">
          <RelayFrame />
        </div>
        <p className="mt-3 text-sm text-[var(--color-ink-soft)]">
          That&apos;s the actual deployed app, running in two windows that share a workspace. Not a
          video, not a mockup.
        </p>

        {/* how the sync engine works — a genuine sequence, so it's numbered */}
        <div className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <h3 className="t-h2 font-[family-name:var(--font-display)]">What one edit does</h3>
            <p className="measure-tight mt-3 text-[var(--color-ink-soft)]">
              The path a single status change travels, from click to every other screen.
            </p>
          </div>
          <ol className="space-y-6">
            {steps.map(([title, body], i) => (
              <li key={title} className="reveal flex gap-4">
                <span className="mono mt-0.5 shrink-0 text-sm text-[var(--color-amber)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="font-[family-name:var(--font-display)] text-[1.15rem]">{title}</h4>
                  <p className="measure mt-1 text-[var(--color-ink-soft)]">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* hardest problem */}
        <div className="panel reveal mt-16 grid gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div>
            <p className="mb-3">
              <span className="kicker">The part that fought back</span>
            </p>
            <h3 className="font-[family-name:var(--font-display)] text-[1.4rem]">
              Making &ldquo;instant&rdquo; and &ldquo;correct&rdquo; agree when they disagree
            </h3>
            <p className="mt-3 text-[var(--color-ink-soft)]">
              The worst bug an optimistic UI can have is lying to you. I show your change before the
              server confirms it, which is great until the server rejects it or your wifi dies
              mid-edit. So every optimistic change keeps its pre-change value and rolls back to exactly
              what the server believes if the mutation fails. Drop the connection and edits queue
              locally, then flush in order on reconnect and reconcile against whatever moved while you
              were gone. The websocket was never the hard part. Reconciling two versions of the truth
              was.
            </p>
          </div>
          <pre className="mono overflow-x-auto rounded-lg border border-[var(--color-rule)] bg-[var(--color-night)] p-4 text-[0.78rem] leading-relaxed text-[var(--color-night-ink)]">
            <code>{ROLLBACK_SNIPPET}</code>
          </pre>
        </div>

        {/* keyboard + what was left out */}
        <div className="reveal mt-16 grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-[1.3rem]">
              Keyboard first, mouse optional
            </h3>
            <p className="measure mt-3 text-[var(--color-ink-soft)]">
              Presence shows who is online, who is viewing an issue, and who is editing which field.
              Titles propagate as you type. Everything has a key:
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {keys.map(([k, label]) => (
                <li key={k} className="flex items-center gap-2 text-sm">
                  <kbd>{k}</kbd>
                  <span className="text-[var(--color-ink-soft)]">{label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-[1.3rem]">
              What I left out, on purpose
            </h3>
            <p className="measure mt-3 text-[var(--color-ink-soft)]">
              This is live propagation, not full collaborative co-typing. Two people editing one
              title see each other&apos;s changes land, but I did not build CRDT character-merging.
              For an issue tracker, last-write-wins with fast propagation is honest and far simpler,
              and a CRDT is a lot of complexity to buy a feature this product doesn&apos;t need.
            </p>
          </div>
        </div>

        {/* stack + prominent links */}
        <ul className="mt-14 flex flex-wrap gap-2">
          {stack.map((s) => (
            <li
              key={s}
              className="mono rounded-md border border-[var(--color-rule)] bg-[var(--color-paper-2)] px-2.5 py-1 text-xs text-[var(--color-ink-soft)]"
            >
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a
            href="https://relayy-web.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-md border-2 border-[var(--color-ink)] bg-[var(--color-marker)] px-5 py-3 font-[family-name:var(--font-display)] tracking-wide text-[#1c1a17] shadow-[4px_4px_0_var(--color-ink)] transition-transform duration-150 hover:-translate-y-0.5"
          >
            Open the live app
            <span aria-hidden="true">↗</span>
          </a>
          <span className="text-sm text-[var(--color-ink-soft)]">
            Best with two windows open side by side.
          </span>
        </div>
      </div>
    </section>
  );
}
