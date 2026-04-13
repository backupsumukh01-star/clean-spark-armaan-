"use client";

import { motion } from "framer-motion";

export default function AnimatedLine() {
  return (
    <div className="flex justify-center py-24">
      <svg width="2" height="120" viewBox="0 0 2 120">
        <motion.line
          x1="1"
          y1="0"
          x2="1"
          y2="120"
          stroke="#C9A227"
          strokeWidth="2"
          strokeDasharray="120"
          strokeDashoffset="120"
          initial={{ strokeDashoffset: 120 }}
          whileInView={{ strokeDashoffset: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}
