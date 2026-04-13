"use client";

import { motion } from "framer-motion";
import { motionPresets } from "@/lib/motion";

const features = [
  {
    title: "Mining, not marketing",
    desc: "We speak in megawatts and uptime — clear metrics instead of hype cycles.",
  },
  {
    title: "BTC treasury mindset",
    desc: "Block rewards and treasury decisions are framed around long Bitcoin exposure.",
  },
  {
    title: "On-chain alignment",
    desc: "CLSK on BNB Smart Chain links community participation to disclosed mining milestones.",
  },
  {
    title: "Safety & custody",
    desc: "Operational security, wallet hygiene, and vendor diligence are treated as first-class.",
  },
];

export default function Features() {
  return (
    <motion.section {...motionPresets.fadeUp} className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-heading text-center text-3xl font-semibold text-text mb-12">
          Why CleanSpark
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur"
            >
              <h3 className="font-heading text-lg font-semibold text-text mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
