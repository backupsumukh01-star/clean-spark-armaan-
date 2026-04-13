import { NextResponse } from "next/server";
import { CONTRACT_ADDRESS } from "@/lib/constants";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const res = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${CONTRACT_ADDRESS}`
    );
    const data = await res.json();

    if (!res.ok || !data?.pairs?.length) {
      return NextResponse.json({ priceUsd: null }, { status: 200 });
    }

    const pairs = data.pairs as Array<{
      chainId: string;
      priceUsd?: string;
    }>;

    const bscPair = pairs.find((p) => p.chainId === "bsc");
    const pair = bscPair ?? pairs[0];
    const priceUsd = pair?.priceUsd ?? null;

    return NextResponse.json({ priceUsd });
  } catch {
    return NextResponse.json({ priceUsd: null }, { status: 200 });
  }
}
