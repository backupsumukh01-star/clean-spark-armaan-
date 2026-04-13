"use client";

import { CONTRACT_ADDRESS, TOKEN_NAME, TOKEN_SYMBOL } from "@/lib/constants";

const PANCAKE_BASE = "https://pancakeswap.finance/swap?chain=bsc";

export default function PancakeSwapBuy() {
  const url = `${PANCAKE_BASE}&outputCurrency=${CONTRACT_ADDRESS}`;

  return (
    <div className="rounded-xl border border-border bg-bg p-6">
      <h3 className="font-heading text-lg font-semibold text-text mb-2">
        Buy on PancakeSwap
      </h3>
      <p className="mb-4 text-sm text-muted">
        Trade BNB or stablecoins for {TOKEN_NAME} ({TOKEN_SYMBOL}) on BNB Smart
        Chain.
      </p>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded-lg bg-primary px-5 py-3 font-medium text-[#1c1810] shadow-sm transition hover:opacity-90"
      >
        Open PancakeSwap
      </a>

      <p className="mt-3 text-xs text-muted">
        Always verify the contract address before trading.
      </p>
    </div>
  );
}
