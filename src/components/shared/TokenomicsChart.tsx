"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: [
    "Community & Airdrops",
    "Ecosystem Growth",
    "Liquidity Provision",
    "Team (Vested)",
    "Marketing & Partnerships",
    "Development & Treasury",
  ],
  datasets: [
    {
      data: [20, 25, 20, 15, 10, 10],
      backgroundColor: [
        "#C9A227",
        "#E8C547",
        "#B8860B",
        "#D4AF37",
        "#8B6914",
        "#5C564A",
      ],
      borderWidth: 0,
    },
  ],
};

const options = {
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        color: "#5C564A",
        padding: 20,
      },
    },
    tooltip: {
      callbacks: {
        label: (context: { label: string; parsed: number }) =>
          `${context.label}: ${context.parsed}%`,
      },
    },
  },
};

export default function TokenomicsChart() {
  return (
    <div className="mx-auto max-w-md">
      <Doughnut data={data} options={options} />
    </div>
  );
}
