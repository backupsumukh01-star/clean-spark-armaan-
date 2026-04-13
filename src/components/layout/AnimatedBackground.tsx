"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <motion.div
      className="fixed inset-0 -z-10"
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 28,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        background:
          "linear-gradient(125deg, #FAF8F5, #FFF9F0, #F5EDD8, #FAF8F5)",
        backgroundSize: "400% 400%",
      }}
    />
  );
}
