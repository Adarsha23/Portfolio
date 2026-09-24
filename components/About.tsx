import Image from "next/image";

const principles = [
  ["Finished beats big.", "One tool that fully works beats a big one that half-works. I ship the small, done thing."],
  ["Steal from the platform.", "The OS and the browser already do a ton. I check what's built in before I npm-install a problem."],
  ["Hands stay on the keyboard.", "If I touch it every day, reaching for the mouse is a bug."],
  ["Yeah, I use AI.", "Claude Code and Antigravity write my boilerplate. I just don't merge anything I can't explain."],
];

export default function About() {
  return (
    <section
      id="about"
      tabIndex={-1}
      className="border-t-2 border-[var(--color-ink)] focus:outline-none"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <h2 className="t-display text-[clamp(2.6rem,1.6rem+3.4vw,4.4rem)]">Off the clock</h2>
        <p className="mt-3 text-[var(--color-ink-soft)] t-lead">
          I read comics (sometimes I star in one), I sing, and I run on metal.
        </p>

        <div className="mt-10 grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
          {/* the comic */}
          <figure className="reveal panel overflow-hidden">
            <Image
              src="/me/comic-bw.jpg"
              alt="A nine-panel comic: Adarsha writing perfect code at 3am, a critical bug appears, he battles it to the pointer arithmetic, squashes it, and ends with a Best Developer mug."
              width={900}
              height={905}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-full w-full object-cover"
            />
          </figure>

          {/* the playlist, filling its card */}
          <div className="reveal flex flex-col">
            <div className="min-h-[420px] w-full flex-1 overflow-hidden rounded-md border-2 border-[var(--color-ink)] shadow-[5px_5px_0_var(--color-ink)]">
              <iframe
                title="Adarsha's metal playlist on Spotify"
                src="https://open.spotify.com/embed/playlist/1Ff9IYQkKGvbrXthjccekz?theme=0"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                className="block h-full min-h-[420px] w-full"
              />
            </div>
            <a
              href="https://open.spotify.com/playlist/1Ff9IYQkKGvbrXthjccekz"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-[44px] items-center gap-1.5 text-sm text-[var(--color-ink-soft)] transition-colors duration-150 hover:text-[var(--color-ink)]"
            >
              Open the full playlist in Spotify
              <span aria-hidden="true" className="mono">↗</span>
            </a>
          </div>
        </div>

        {/* how I work — full-width row of comic panels */}
        <h3 className="t-h2 mt-14">How I work</h3>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map(([title, body]) => (
            <li key={title} className="panel reveal p-5">
              <h4 className="font-[family-name:var(--font-display)] text-[1.15rem] tracking-wide">
                {title}
              </h4>
              <p className="mt-1.5 text-[0.95rem] text-[var(--color-ink-soft)]">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
