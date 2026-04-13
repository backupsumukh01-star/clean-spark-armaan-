export type RangeKey = "launch" | "7" | "30";

// Replace with real CoinGecko slug AFTER listing
const COIN_ID = "cleanspark-clsk";

export async function fetchMarketData(range: RangeKey): Promise<{
  prices: number[];
  labels: string[];
}> {
  try {
    const days = range === "launch" ? "max" : range;

    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${COIN_ID}/market_chart?vs_currency=usd&days=${days}`
    );
    const json = await res.json();

    if (!res.ok || !json?.prices?.length) {
      return { prices: [1, 1.01, 1.02, 1.03], labels: ["", "", "", ""] };
    }

    const prices = json.prices.map((p: [number, number]) => p[1]);
    const labels = json.prices.map((p: [number, number]) =>
      new Date(p[0]).toLocaleDateString()
    );

    return { prices, labels };
  } catch {
    return {
      prices: [1, 1.01, 1.02, 1.03],
      labels: ["", "", "", ""],
    };
  }
}
