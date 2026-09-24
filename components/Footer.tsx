export default function Footer() {
  return (
    <footer className="border-t-2 border-[var(--color-ink)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-10 text-sm text-[var(--color-ink-soft)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="font-[family-name:var(--font-display)] tracking-wide text-[var(--color-ink)]">
          © {new Date().getFullYear()} Adarsha Prasai
        </p>
        <p className="mono text-xs">
          Built from scratch. Next.js, no template, no CMS.
        </p>
      </div>
    </footer>
  );
}
