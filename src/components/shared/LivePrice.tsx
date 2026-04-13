"use client";

import { useEffect, useState } from "react";
import { fetchTokenPrice } from "@/lib/price";
import Skeleton from "./Skeleton";

const REFRESH_MS = 30_000;

export function formatPriceUsd(priceUsd: string): string {
  const n = parseFloat(priceUsd);
  if (n >= 1) return n.toFixed(4);
  if (n >= 0.01) return n.toFixed(6);
  if (n >= 0.0001) return n.toFixed(8);
  if (n > 0) return n.toFixed(10).replace(/\.?0+$/, "");
  return "0";
}

export default function LivePrice() {
  const [price, setPrice] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const data = await fetchTokenPrice();
      if (cancelled) return;
      setPrice(data?.priceUsd ?? null);
      setLoading(false);
    }

    load();
    const interval = setInterval(load, REFRESH_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return <Skeleton className="h-8 w-24" />;
  }

  if (!price) {
    return <span className="text-muted">—</span>;
  }

  return (
    <span className="font-mono text-text">${formatPriceUsd(price)}</span>
  );
}
