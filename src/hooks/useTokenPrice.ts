"use client";

import { useEffect, useState } from "react";
import { fetchTokenPrice } from "@/lib/price";

const REFRESH_MS = 30_000;

export function useTokenPrice() {
  const [priceUsd, setPriceUsd] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const data = await fetchTokenPrice();
      if (cancelled) return;
      setPriceUsd(data?.priceUsd ?? null);
    }

    load();
    const interval = setInterval(load, REFRESH_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return priceUsd;
}
