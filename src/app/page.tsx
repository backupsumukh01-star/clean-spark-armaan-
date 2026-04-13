import Hero from "@/components/home/Hero";
import MiningHighlights from "@/components/home/MiningHighlights";
import Stats from "@/components/home/Stats";
import PerformanceSection from "@/components/home/PerformanceSection";
import Features from "@/components/home/Features";
import Timeline from "@/components/home/Timeline";
import BuyVerifySection from "@/components/shared/BuyVerifySection";
import FinalCTA from "@/components/home/FinalCTA";
import AnimatedLine from "@/components/shared/AnimatedLine";
import PancakeSwapEmbedSection from "@/components/shared/PancakeSwapEmbedSection";

export default function Home() {
  return (
    <>
      <Hero />
      <MiningHighlights />
      <Stats />
      <PerformanceSection />
      <AnimatedLine />
      <Features />
      <AnimatedLine />
      <Timeline />
      <AnimatedLine />
      <BuyVerifySection />
      <FinalCTA />
      <PancakeSwapEmbedSection />
    </>
  );
}
