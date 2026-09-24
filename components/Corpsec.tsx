const groups = [
  {
    kicker: "Built the product",
    title: "Backend, frontend, and the calls in between",
    body: "I worked across the stack on products 500+ clients use every day, and sat in the architecture-design discussions where the shape of things got decided. Not just closing tickets, helping choose what the tickets should be.",
  },
  {
    kicker: "Ran the process",
    title: "Rebuilt how the team plans, as its technical PM",
    body: "I reworked the whole project-management setup in Notion, how cards are written, how epics and sprints are defined, and I planned the sprints. In my six months the tech team missed exactly one deadline, roughly a 60% drop from before I joined.",
  },
  {
    kicker: "Automated the busywork",
    title: "n8n doing the boring parts so people don't",
    body: "Find a bug, and n8n files the bug report in the bug database automatically. Put a deadline and an assignee on a card, and it shows up in that person's Google Calendar. Drop a PR link on your task: when it merges to staging the card moves itself, and when it hits production the card marks itself checked and approved.",
  },
  {
    kicker: "Made it seen",
    title: "SEO, the site's UI, and the company's voice",
    body: "I worked on SEO for corpsec.io and koulier.com alongside an experienced SEO engineer, helped design corpsec.io itself, and I run Corpsec's LinkedIn. I care about the product all the way out to how people find it and what they feel when they land.",
  },
];

const stats = [
  ["1", "missed deadline in 6 months (~60% fewer)"],
  ["500+", "clients actively using what I shipped"],
  ["60s → 90s", "corpsec.io Lighthouse (koulier hit 100)"],
  ["0 → 800+", "followers I grew on Corpsec's LinkedIn"],
];

export default function Corpsec() {
  return (
    <section
      id="corpsec"
      tabIndex={-1}
      className="border-t-2 border-[var(--color-ink)] focus:outline-none"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <div>
            <h2 className="t-display text-[clamp(2.4rem,1.6rem+3vw,3.6rem)]">Corpsec</h2>
            <p className="mt-1 text-[var(--color-ink-soft)] t-lead">
              Full-stack developer & technical PM · ~6 months
            </p>
          </div>
          <p className="data max-w-[22ch] text-right">
            Currently here. Currently looking for what&apos;s next.
          </p>
        </div>

        <p className="measure mt-8 text-[1.15rem]">
          I&apos;m not a developer who only executes what he&apos;s handed. At Corpsec I{" "}
          <span className="mark mark-draw">built the thing and ran how it gets built</span>, then
          made sure people could find it.
        </p>

        {/* real numbers */}
        <dl className="panel reveal mt-12 grid grid-cols-2 gap-[2px] overflow-hidden bg-[var(--color-ink)] lg:grid-cols-4">
          {stats.map(([n, label]) => (
            <div key={label} className="bg-[var(--color-paper-2)] p-5">
              <dt className="font-[family-name:var(--font-display)] text-[clamp(2rem,1.4rem+2vw,3rem)] leading-none text-[var(--color-pop)]">
                {n}
              </dt>
              <dd className="mt-2 text-sm text-[var(--color-ink-soft)]">{label}</dd>
            </div>
          ))}
        </dl>

        {/* contributions */}
        <div className="mt-14 grid gap-x-14 gap-y-10 md:grid-cols-2">
          {groups.map((g) => (
            <div key={g.kicker} className="reveal">
              <p className="mb-2.5">
                <span className="kicker">{g.kicker}</span>
              </p>
              <h3 className="font-[family-name:var(--font-display)] text-[1.3rem]">{g.title}</h3>
              <p className="measure mt-2 text-[var(--color-ink-soft)]">{g.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
