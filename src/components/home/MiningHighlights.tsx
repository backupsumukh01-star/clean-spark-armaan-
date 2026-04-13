"use client";

import { motion } from "framer-motion";
import { motionPresets } from "@/lib/motion";

const highlights = [
  {
    title: "Bitcoin-first",
    body: "Mining strategy centered on BTC block rewards and network security — not short-term alt narratives.",
  },
  {
    title: "Power discipline",
    body: "We prioritize stable, cost-aware energy contracts and continuous optimization of joules per terahash.",
  },
  {
    title: "Transparent ops",
    body: "Regular updates on fleet status, expansion milestones, and how treasury and token programs support the mines.",
  },
];

export default function MiningHighlights() {
  return (
    <motion.section
      {...motionPresets.fadeUp}
      className="border-b border-border bg-card/40 py-16"
    >
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-heading text-center text-2xl font-semibold text-text md:text-3xl">
          How we mine
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted">
          Clan Spark is structured as a Bitcoin mining company: hardware, power,
          and people working together toward dependable hashrate and honest
          communication with holders.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="rounded-xl border border-border bg-bg p-6 text-left"
            >
              <h3 className="font-heading text-lg font-semibold text-primary">
                {h.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{h.body}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
