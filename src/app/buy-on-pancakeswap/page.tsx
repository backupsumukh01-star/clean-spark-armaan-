import type { Metadata } from "next";
import PancakeSwapEmbedSection from "@/components/shared/PancakeSwapEmbedSection";

export const metadata: Metadata = {
  title: "Buy on PancakeSwap | CleanSpark",
  description:
    "Swap BNB or stablecoins for CLSK (CleanSpark Ltd) on PancakeSwap.",
};

export default function BuyOnPancakeSwapPage() {
  return (
    <PancakeSwapEmbedSection headingLevel="h1" />
  );
}

