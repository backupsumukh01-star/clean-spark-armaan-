"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  Filler,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { fetchChartData, type RangeKey } from "@/lib/chart";
import ChartSkeleton from "@/components/shared/ChartSkeleton";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
);

const ranges: { key: RangeKey; label: string }[] = [
  { key: "launch", label: "Since Launch" },
  { key: "7", label: "7D" },
  { key: "30", label: "30D" },
];

export default function PerformanceSparkline() {
  const [range, setRange] = useState<RangeKey>("launch");
  const [prices, setPrices] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [cursorPrice, setCursorPrice] = useState<string>("—");
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNoData(false);
    fetchChartData(range).then(({ prices, labels }) => {
      setPrices(prices);
      setLabels(labels);
      setNoData(prices.length === 0);
      setLoading(false);
      setCursorPrice("—");
    });
  }, [range]);

  const resetCursorPrice = () => setCursorPrice("—");

  if (noData && !loading) {
    return (
      <div aria-hidden>
        <div className="mb-3 flex gap-2">
          {ranges.map((r) => (
            <button
              key={r.key}
              onClick={() => setRange(r.key)}
              className={`rounded-md border px-3 py-1 text-xs transition ${
                range === r.key
                  ? "border-primary bg-primary text-[#1c1810]"
                  : "border-border text-muted hover:text-text"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
        <div className="flex h-[120px] items-center justify-center rounded-lg border border-border bg-card text-sm text-muted">
          Chart data coming soon
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div aria-hidden>
        <div className="mb-3 flex gap-2">
          {ranges.map((r) => (
            <button
              key={r.key}
              disabled
              className="rounded-md border border-border px-3 py-1 text-xs text-muted"
            >
              {r.label}
            </button>
          ))}
        </div>
        <div className="mb-2 text-sm text-muted">
          Price at cursor: <span className="font-mono text-text">—</span>
        </div>
        <ChartSkeleton />
      </div>
    );
  }

  const data = {
    labels,
    datasets: [
      {
        data: prices,
        borderColor: "#C9A227",
        backgroundColor: "rgba(201, 162, 39, 0.12)",
        borderWidth: 2,
        tension: 0.35,
        fill: true,
        pointRadius: 0,
        pointHitRadius: 25,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        displayColors: false,
        backgroundColor: "#FFFFFF",
        titleColor: "#1A1612",
        bodyColor: "#5C564A",
        padding: 10,
        callbacks: {
          label: (ctx: { parsed: { y: number | null } }) => {
            const n = ctx.parsed.y ?? 0;
            const price =
              n >= 0.01
                ? `$${n.toFixed(4)}`
                : n > 0
                  ? `$${n.toFixed(10).replace(/\.?0+$/, "")}`
                  : "$0";
            setCursorPrice(price);
            return `Price: ${price}`;
          },
        },
      },
    },
    scales: {
      x: { display: false },
      y: { display: false, beginAtZero: false },
    },
  };

  return (
    <div aria-hidden>
      {/* Range Toggle */}
      <div className="mb-3 flex gap-2">
        {ranges.map((r) => (
          <button
            key={r.key}
            onClick={() => setRange(r.key)}
            className={`rounded-md border px-3 py-1 text-xs transition ${
              range === r.key
                ? "border-primary bg-primary text-[#1c1810]"
                : "border-border text-muted hover:text-text"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Price at Cursor */}
      <div className="mb-2 text-sm text-muted">
        Price at cursor:{" "}
        <span className="font-mono text-text">{cursorPrice}</span>
      </div>

      {/* Chart */}
      <div
        className="relative h-[120px] w-full"
        onMouseLeave={resetCursorPrice}
        onTouchEnd={resetCursorPrice}
      >
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
