"use client";

import { motion } from "framer-motion";

export default function GovernancePage() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-5xl px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-4xl font-semibold text-text mb-8"
        >
          CleanSpark Governance
        </motion.h1>

        <p className="mb-12 max-w-3xl text-muted">
          As a Bitcoin mining operator, CleanSpark pairs on-chain CLSK governance
          with real-world operations: holders can weigh in on disclosed treasury
          uses, community initiatives, and long-term alignment with mining
          expansion — always subject to law, custody policy, and board-level
          oversight where applicable.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            [
              "Token Holder Voting",
              "CLSK holders will be able to vote on proposals affecting the ecosystem.",
            ],
            [
              "Treasury Governance",
              "Community-approved decisions on ecosystem funding and development.",
            ],
            [
              "Protocol Evolution",
              "Governance proposals to guide long-term utility and expansion.",
            ],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <h3 className="font-heading text-lg font-semibold text-text mb-2">
                {title}
              </h3>
              <p className="text-sm text-muted">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-xl border border-border bg-card p-6">
          <h3 className="font-heading text-lg font-semibold text-text mb-3">
            Governance Status
          </h3>
          <p className="text-sm text-muted">
            Governance is planned for a future phase following ecosystem
            stabilization and cross-chain expansion. Detailed mechanics will be
            published prior to activation.
          </p>
        </div>
      </div>
    </section>
  );
}
