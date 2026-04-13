import type { Metadata } from "next";
import HowToBuyGuide from "@/components/how-to-buy/HowToBuyGuide";

export const metadata: Metadata = {
  title: "How to Buy CLSK | CleanSpark Ltd",
  description:
    "Step-by-step guide to safely purchase CLSK (CleanSpark Ltd) on BNB Smart Chain.",
};

export default function HowToBuyPage() {
  return <HowToBuyGuide />;
}
