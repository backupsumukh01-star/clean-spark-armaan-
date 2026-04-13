"use client";

import { motion } from "framer-motion";
import { useChainId, useSwitchChain } from "wagmi";
import { bsc } from "wagmi/chains";

export default function WrongNetworkOverlay() {
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  if (chainId === undefined || chainId === bsc.id) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/90 backdrop-blur"
    >
      <div className="max-w-sm rounded-xl border border-border bg-card p-6 text-center">
        <h3 className="font-heading text-xl font-semibold text-text mb-2">
          Wrong Network
        </h3>
        <p className="mb-4 text-sm text-muted">
          Please switch to BNB Smart Chain to continue.
        </p>
        <button
          onClick={() => switchChain({ chainId: bsc.id })}
          className="rounded-lg bg-primary px-4 py-2 font-medium text-[#1c1810] shadow-sm transition hover:opacity-90"
        >
          Switch Network
        </button>
      </div>
    </motion.div>
  );
}
