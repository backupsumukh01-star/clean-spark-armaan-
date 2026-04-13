"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function ParallaxLayers({
  background,
  mid,
  foreground,
}: {
  background: React.ReactNode;
  mid: React.ReactNode;
  foreground: React.ReactNode;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const yMid = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const yFg = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y: yBg }} className="absolute inset-0 -z-30">
        {background}
      </motion.div>

      <motion.div style={{ y: yMid }} className="absolute inset-0 -z-20">
        {mid}
      </motion.div>

      <motion.div style={{ y: yFg }} className="relative z-10">
        {foreground}
      </motion.div>
    </section>
  );
}
