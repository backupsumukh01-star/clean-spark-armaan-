import type { Metadata } from "next";
import { seo } from "@/lib/seo";

export const metadata: Metadata = {
  title: seo.roadmap.title,
  description: seo.roadmap.description,
};

const phases = [
  ["Foundation", "Launch, liquidity, docs"],
  ["Growth", "Community and analytics"],
  ["Expansion", "Cross-chain deployment"],
  ["Governance", "Utility and DAO vision"],
];

export default function RoadmapPage() {
  return (
    <section className="py-24 bg-bg">
      <div className="mx-auto max-w-5xl px-6">
        <h1 className="font-heading text-4xl font-semibold text-text mb-12">
          Roadmap
        </h1>
        <div className="space-y-6">
          {phases.map(([title, desc]) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <h3 className="font-heading text-xl font-semibold text-text">
                {title}
              </h3>
              <p className="mt-2 text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
