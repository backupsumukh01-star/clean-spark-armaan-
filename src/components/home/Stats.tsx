"use client";

import { motion } from "framer-motion";
import CountUp from "@/components/shared/CountUp";
import LivePrice from "@/components/shared/LivePrice";
import { TOKEN_SYMBOL } from "@/lib/constants";

const stats = [
  { label: `${TOKEN_SYMBOL} Live Price`, value: <LivePrice /> },
  {
    label: "Target fleet (PH/s)",
    value: <span>2.5+</span>,
  },
  { label: "Primary asset", value: "Bitcoin (BTC)" },
  {
    label: "Token supply (verify on BscScan)",
    value: (
      <span className="flex flex-col items-center gap-0.5">
        <CountUp value={1000000000} />
        <span className="text-lg font-semibold md:text-xl">{TOKEN_SYMBOL}</span>
      </span>
    ),
  },
  { label: "Network", value: "BNB Smart Chain" },
];

export default function Stats() {
  return (
    <section className="py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 md:grid-cols-3 lg:grid-cols-5">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex min-h-[8.5rem] min-w-0 flex-col justify-between gap-2 rounded-xl border border-border bg-card px-4 py-5 text-center sm:px-5 sm:py-6"
          >
            <div className="min-w-0 font-heading text-xl font-semibold leading-snug tracking-tight text-text tabular-nums sm:text-2xl">
              {s.value}
            </div>
            <div className="text-balance text-xs leading-relaxed text-muted">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
      <p className="mx-auto mt-6 max-w-2xl px-6 text-center text-xs text-muted">
        Fleet figures are directional targets for communication only — not a
        guarantee of performance. Past hashrate does not predict future results.
      </p>
    </section>
  );
}
