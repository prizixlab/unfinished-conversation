import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col justify-between">
      <div className="space-y-10">
        <div className="space-y-5">
          <p className="text-sm uppercase tracking-[0.28em] text-muted">
            Verba Non Dicta
          </p>

          <h1 className="font-[var(--font-lora)] text-4xl md:text-5xl leading-tight">
            Say what never found its moment.
          </h1>

          <p className="max-w-2xl text-lg text-muted leading-relaxed">
            For moments when you want to speak to someone you loved — a parent, a
            partner, a grandparent — who is no longer here.
            <br />
            <br />
            For what life brought later. For what was never said. For what still
            lives in the heart.
          </p>

          <p className="text-sm text-muted">
            Write in any language — whatever feels natural.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <Link
            href="/start"
            className="glow-hover inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-sm font-semibold tracking-[0.18em] uppercase text-accent-text"
          >
            Begin
          </Link>

          <div className="rounded-3xl border border-border px-6 py-3 text-sm text-muted">
            One private message. One thoughtful response. One closing moment.
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 text-sm text-muted">
        <p>Private by design. Your message is never public.</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <p>Made for closure, reflection, and remembrance.</p>
          <Link
            href="/faq"
            className="underline underline-offset-4 hover:text-text"
          >
            FAQ
          </Link>
        </div>
      </div>
    </div>
  );
}
