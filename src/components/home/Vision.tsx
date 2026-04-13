"use client";

import { motion } from "framer-motion";

export default function Vision() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="border-b border-border py-24 bg-bg"
    >
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="font-heading text-3xl font-semibold text-text md:text-4xl">
          Built for decades of blocks
        </h2>
        <p className="mt-6 text-muted">
          Clan Spark exists to run durable Bitcoin mining: honest power deals,
          resilient sites, and reporting holders can reason about. The CLSK token
          is a companion to that mission — not a substitute for understanding
          mining risk, regulation, or BTC volatility.
        </p>
      </div>
    </motion.section>
  );
}
