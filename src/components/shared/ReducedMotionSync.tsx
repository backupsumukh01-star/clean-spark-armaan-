"use client";

import { useEffect } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Syncs OS prefers-reduced-motion to document.
 * No UI — accessibility handled automatically.
 */
export default function ReducedMotionSync() {
  const reduced = useReducedMotion();

  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? "off" : "on";
  }, [reduced]);

  return null;
}
