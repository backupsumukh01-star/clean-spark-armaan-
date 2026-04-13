export type RangeKey = "launch" | "7" | "30";

export async function fetchChartData(range: RangeKey): Promise<{
  prices: number[];
  labels: string[];
}> {
  try {
    const res = await fetch(`/api/chart?range=${range}`, { cache: "no-store" });
    const data = await res.json();

    if (!res.ok || !data?.prices?.length) {
      return { prices: [], labels: [] };
    }

    return {
      prices: data.prices,
      labels: data.labels,
    };
  } catch {
    return { prices: [], labels: [] };
  }
}
