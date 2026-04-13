import Link from "next/link";

const phases = [
  ["Foundation", "Launch, liquidity, docs"],
  ["Growth", "Community and analytics"],
  ["Expansion", "Cross-chain deployment"],
  ["Governance", "Utility and DAO vision"],
];

export default function RoadmapPreview() {
  return (
    <section className="border-b border-border bg-card py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="font-heading text-3xl font-semibold text-text mb-12">
          Measured Growth, Clear Direction
        </h2>
        <div className="space-y-6">
          {phases.map(([title, desc]) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-bg p-6"
            >
              <h3 className="font-heading text-lg font-semibold text-text">
                {title}
              </h3>
              <p className="mt-2 text-muted">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/roadmap"
            className="inline-flex items-center text-primary hover:underline"
          >
            View Full Roadmap →
          </Link>
        </div>
      </div>
    </section>
  );
}
