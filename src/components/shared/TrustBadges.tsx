"use client";

import { motion } from "framer-motion";

export default function TrustBadges() {
  const badges = [
    {
      title: "Smart Contract Audit",
      desc: "Independent audit review",
      status: "Planned / Completed",
    },
    {
      title: "Liquidity Locked",
      desc: "LP tokens locked for stability",
      status: "Verified",
    },
  ];

  return (
    <section className="py-20">
      <div className="mx-auto grid max-w-4xl gap-6 px-6 md:grid-cols-2">
        {badges.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="relative overflow-hidden rounded-xl border border-border bg-card p-6"
          >
            <motion.div
              className="absolute inset-0 opacity-10"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{
                background:
                  "linear-gradient(120deg,#C9A227,#E8C547,#B8860B)",
                backgroundSize: "200% 200%",
              }}
            />

            <div className="relative">
              <h3 className="font-heading text-lg font-semibold text-text">
                {b.title}
              </h3>
              <p className="mt-1 text-sm text-muted">{b.desc}</p>
              <div className="mt-4 inline-block rounded-full border border-border bg-bg px-3 py-1 text-xs text-text">
                {b.status}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
