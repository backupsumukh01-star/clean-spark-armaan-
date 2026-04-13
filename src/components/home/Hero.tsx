"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import ParallaxContainer from "@/components/shared/ParallaxContainer";
import ParallaxLayers from "@/components/shared/ParallaxLayers";
import HeroVideo from "./HeroVideo";
import ConnectWallet from "@/components/shared/ConnectWallet";
import CryptoDecor from "@/components/shared/CryptoDecor";
import { TOKEN_SYMBOL } from "@/lib/constants";

function HeroContent() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="max-w-4xl px-6 text-center"
      >
        <ParallaxContainer>
          <p className="mb-3 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Bitcoin mining operations
          </p>
          <h1 className="font-heading text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-[#6B5A1E] via-[#C9A227] to-[#8B6914] md:text-7xl">
            CLEANSPARK
          </h1>
        </ParallaxContainer>

        <CryptoDecor />

        <p className="mt-6 text-xl text-muted">
          Institutional-grade Bitcoin mining with a focus on uptime, efficient
          power strategy, and clear reporting.
        </p>

        <p className="mx-auto mt-4 max-w-2xl text-muted">
          We secure the network through modern ASIC fleets, disciplined
          maintenance, and a long-term view on BTC accumulation, plus on-chain
          tools for community participation.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <ConnectWallet />
          <Link
            href="/buy-on-pancakeswap"
            className="rounded-lg border border-primary bg-card/80 px-6 py-3 font-medium text-primary shadow-sm transition hover:bg-card hover:border-primary"
          >
            Trade {TOKEN_SYMBOL} Token
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(typeof window !== "undefined" && window.innerWidth < 768);
  }, []);

  return (
    <ParallaxLayers
      background={
        <div className="relative h-full w-full">
          <motion.div
            className="absolute inset-0 h-full w-full"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            style={{
              background:
                "radial-gradient(circle at 20% 30%, rgba(201, 162, 39, 0.18), transparent 42%)," +
                "radial-gradient(circle at 80% 70%, rgba(212, 175, 55, 0.12), transparent 45%)," +
                "linear-gradient(180deg, #FAF8F5 0%, #FFF9F0 100%)",
              backgroundSize: "200% 200%",
            }}
          />
          {!isMobile && <HeroVideo />}
        </div>
      }
      mid={
        <div className="h-full w-full bg-primary/5 blur-3xl" />
      }
      foreground={<HeroContent />}
    />
  );
}
