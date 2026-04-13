import { NextResponse } from "next/server";
import { CONTRACT_ADDRESS } from "@/lib/constants";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const range = searchParams.get("range") ?? "launch";

  try {
    const res = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${CONTRACT_ADDRESS}`
    );
    const data = await res.json();

    if (!res.ok || !data?.pairs?.length) {
      return NextResponse.json({ prices: [], labels: [] }, { status: 200 });
    }

    const pairs = data.pairs as Array<{
      chainId: string;
      priceUsd?: string;
      priceChange?: { h24?: number; h6?: number };
    }>;

    const bscPair = pairs.find((p) => p.chainId === "bsc");
    const pair = bscPair ?? pairs[0];
    const priceUsd = parseFloat(pair?.priceUsd ?? "0");
    const change24 = pair?.priceChange?.h24 ?? 0;

    if (!priceUsd || priceUsd <= 0) {
      return NextResponse.json({ prices: [], labels: [] }, { status: 200 });
    }

    const pointCount = range === "launch" ? 30 : range === "30" ? 30 : 7;
    const labels: string[] = [];
    const prices: number[] = [];

    const now = Date.now();
    const changeFactor = change24 / 100 + 1;
    const startMult = 1 / Math.sqrt(changeFactor);
    const endMult = Math.sqrt(changeFactor);

    for (let i = 0; i < pointCount; i++) {
      const t = pointCount > 1 ? i / (pointCount - 1) : 1;
      const mult = startMult + t * (endMult - startMult);
      prices.push(priceUsd * mult);
      const d = new Date(now - (pointCount - 1 - i) * 86400000);
      labels.push(d.toLocaleDateString());
    }

    return NextResponse.json({ prices, labels });
  } catch {
    return NextResponse.json({ prices: [], labels: [] }, { status: 200 });
  }
}
