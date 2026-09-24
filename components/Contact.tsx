import CopyEmail from "./CopyEmail";
import Socials from "./Socials";

export default function Contact() {
  return (
    <section
      id="contact"
      tabIndex={-1}
      className="border-t-2 border-[var(--color-ink)] focus:outline-none"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <h2 className="t-display max-w-[16ch] text-[clamp(2.4rem,1.6rem+3vw,4rem)]">
          I&apos;m looking for what&apos;s next.
        </h2>
        <p className="measure mt-6 text-[var(--color-ink-soft)] t-lead">
          Open to full-stack and product roles. Happy to talk native apps, real-time systems, the
          small interactions everyone skips, or which metal record is objectively the best.
        </p>

        <div className="reveal mt-10 flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="mailto:prasaiadarsha@gmail.com"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md border-2 border-[var(--color-ink)] bg-[var(--color-marker)] px-5 py-3 font-[family-name:var(--font-display)] tracking-wide text-[#1c1a17] shadow-[4px_4px_0_var(--color-ink)] transition-transform duration-150 hover:-translate-y-0.5"
            >
              Email me
              <span className="mono text-xs opacity-80">prasaiadarsha@gmail.com</span>
            </a>
            <a
              href="https://wa.me/9779813244949"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md border-2 border-[var(--color-ink)] bg-[var(--color-paper-2)] px-5 py-3 font-[family-name:var(--font-display)] tracking-wide text-[var(--color-ink)] shadow-[4px_4px_0_var(--color-ink)] transition-transform duration-150 hover:-translate-y-0.5"
            >
              WhatsApp
              <span className="mono text-xs text-[var(--color-ink-soft)]">+977 9813244949</span>
            </a>
            <CopyEmail />
          </div>

          <div className="flex items-center gap-1">
            <span className="mr-2 text-sm text-[var(--color-ink-soft)]">Elsewhere:</span>
            <Socials />
          </div>
        </div>
      </div>
    </section>
  );
}
