"use client";

import { getAddress } from "viem";
import { CONTRACT_ADDRESS, TOKEN_SYMBOL } from "@/lib/constants";

const BSC_TOKEN_URL = `https://bscscan.com/token/${CONTRACT_ADDRESS}`;

export default function AddTokenButton() {
  async function addToken() {
    const provider = typeof window !== "undefined"
      ? (window as { ethereum?: { request: (a: unknown) => Promise<unknown> } }).ethereum
      : undefined;

    if (!provider) {
      alert("Wallet not detected. Please install MetaMask.");
      return;
    }

    const address = getAddress(CONTRACT_ADDRESS);
    const token = { address, symbol: TOKEN_SYMBOL, decimals: 18 };

    try {
      const result = await provider.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: token,
        },
      });
      if (result === true) {
        alert(`${TOKEN_SYMBOL} added to your wallet`);
      }
    } catch (e) {
      const err = e as { code?: number; message?: string };
      if (err?.code === 4001 || err?.message?.includes("rejected")) {
        return;
      }
      if (
        confirm(
          `Could not add token automatically. Would you like to open BSCScan to add it manually?`
        )
      ) {
        window.open(BSC_TOKEN_URL, "_blank", "noopener,noreferrer");
      }
    }
  }

  return (
    <button
      onClick={addToken}
      className="rounded-lg bg-secondary px-5 py-3 font-medium text-[#1c1810] shadow-sm transition hover:opacity-90"
    >
      Add {TOKEN_SYMBOL} to Wallet
    </button>
  );
}
