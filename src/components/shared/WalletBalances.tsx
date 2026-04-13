"use client";

import { formatUnits } from "viem";
import { useConnection, useBalance, useReadContract } from "wagmi";
import { CONTRACT_ADDRESS, TOKEN_SYMBOL } from "@/lib/constants";
import { useTokenPrice } from "@/hooks/useTokenPrice";
import Skeleton from "./Skeleton";

const ERC20_ABI = [
  {
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export default function WalletBalances() {
  const { address, status } = useConnection();
  const priceUsd = useTokenPrice();

  const { data: bnb } = useBalance({
    address: address ?? undefined,
  });

  const { data: tokenRaw } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  });

  const tokenFormatted =
    tokenRaw !== undefined ? formatUnits(tokenRaw, 18).slice(0, 8) : undefined;

  const bnbFormatted =
    bnb?.value !== undefined
      ? formatUnits(bnb.value, bnb.decimals).slice(0, 8)
      : undefined;

  if (status !== "connected" || !address) return null;

  const isLoading = bnb === undefined || tokenRaw === undefined;

  if (isLoading) {
    return (
      <div className="space-y-3 rounded-xl border border-border bg-card p-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-32" />
      </div>
    );
  }

  const tokenNum = tokenFormatted ? parseFloat(tokenFormatted) : 0;
  const usdValue =
    priceUsd && tokenNum > 0 ? tokenNum * parseFloat(priceUsd) : null;

  return (
    <div className="rounded-xl border border-border bg-bg p-4 text-sm">
      <div className="flex justify-between text-text">
        <span>BNB Balance</span>
        <span>{bnbFormatted ?? "—"} BNB</span>
      </div>
      <div className="flex justify-between mt-2 text-text">
        <span>{TOKEN_SYMBOL} Balance</span>
        <span>
          {tokenFormatted ?? "—"} {TOKEN_SYMBOL}
        </span>
      </div>
      {usdValue !== null && usdValue > 0 && (
        <div className="mt-2 border-t border-border pt-2 text-muted">
          ≈ ${usdValue < 0.01 ? usdValue.toFixed(6) : usdValue.toFixed(2)} USD
        </div>
      )}
    </div>
  );
}
