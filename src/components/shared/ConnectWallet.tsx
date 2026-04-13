"use client";

import { motion } from "framer-motion";
import { useConnection, useConnect, useDisconnect } from "wagmi";

export default function ConnectWallet() {
  const { address, status } = useConnection();
  const connect = useConnect();
  const { disconnect } = useDisconnect();

  if (status === "connected" && address) {
    return (
      <motion.button
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        onClick={() => disconnect()}
        className="rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-text transition hover:border-primary hover:text-primary"
      >
        {address.slice(0, 6)}…{address.slice(-4)}
      </motion.button>
    );
  }

  const primaryConnector = connect.connectors[0];

  return (
    <motion.button
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      onClick={() => primaryConnector && connect.mutate({ connector: primaryConnector })}
      disabled={connect.isPending || !primaryConnector}
      className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-[#1c1810] shadow-sm transition hover:opacity-90 disabled:opacity-50"
    >
      {connect.isPending ? "Connecting…" : "Connect Wallet"}
    </motion.button>
  );
}
