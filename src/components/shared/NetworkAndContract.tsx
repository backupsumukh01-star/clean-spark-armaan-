"use client";

import { useState } from "react";

declare global {
  interface Window {
    ethereum?: {
      request: (args: {
        method: string;
        params?: unknown[];
      }) => Promise<unknown>;
    };
  }
}

const BSC_PARAMS = {
  chainId: "0x38",
  chainName: "BNB Smart Chain",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18,
  },
  rpcUrls: ["https://bsc-dataseed.binance.org"],
  blockExplorerUrls: ["https://bscscan.com"],
};

import { CONTRACT_ADDRESS } from "@/lib/constants";

export default function NetworkAndContract() {
  const [copied, setCopied] = useState(false);

  async function switchNetwork() {
    if (typeof window === "undefined" || !window.ethereum)
      return alert("Wallet not detected");

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: BSC_PARAMS.chainId }],
      });
    } catch {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [BSC_PARAMS],
      });
    }
  }

  function copyAddress() {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="rounded-2xl border border-border bg-card py-20">
      <div className="mx-auto grid max-w-5xl items-center gap-6 px-6 md:grid-cols-2">
        <div>
          <h3 className="font-heading text-xl text-text mb-3">
            Network & Contract
          </h3>
          <p className="text-sm text-muted">
            Ensure you are connected to the correct network before interacting
            with Clan Spark.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={switchNetwork}
            className="rounded-lg bg-primary px-5 py-3 font-medium text-[#1c1810] shadow-sm transition hover:opacity-90"
          >
            Switch to BNB Smart Chain
          </button>

          <div className="flex items-center gap-2 rounded-lg border border-border bg-bg px-4 py-3">
            <span className="truncate font-mono text-sm text-text">
              {CONTRACT_ADDRESS}
            </span>
            <button onClick={copyAddress} className="text-xs text-primary">
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
