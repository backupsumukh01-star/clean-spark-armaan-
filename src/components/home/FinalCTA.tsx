import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="rounded-2xl border border-border bg-card p-12 text-center">
          <h2 className="font-heading text-3xl font-semibold text-text mb-4">
            Follow the mine
          </h2>

          <p className="mb-8 text-muted">
            Learn how we buy, host, and scale hashrate — and how CLSK fits into
            the broader Clan Spark Bitcoin strategy.
          </p>

          <Link
            href="/how-to-buy"
            className="inline-block rounded-lg bg-primary px-8 py-4 font-medium text-[#1c1810] shadow-sm transition hover:opacity-90"
          >
            Get started
          </Link>
        </div>
      </div>
    </section>
  );
}
