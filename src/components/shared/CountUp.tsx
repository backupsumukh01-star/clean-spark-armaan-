"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function CountUp({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(
    undefined,
  );
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    startedRef.current = false;
    setCount(0);

    if (prefersReducedMotion || value <= 0) {
      setCount(Math.max(0, value));
      return;
    }

    const el = ref.current;
    if (!el) return;

    const run = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      let start = 0;
      const duration = 1200;
      const step = Math.max(1, Math.floor(value / 60));

      intervalRef.current = setInterval(() => {
        start += step;
        if (start >= value) {
          setCount(value);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = undefined;
          }
        } else {
          setCount(start);
        }
      }, duration / 60);
    };

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) run();
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );

    obs.observe(el);
    return () => {
      obs.disconnect();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    };
  }, [value, prefersReducedMotion]);

  return (
    <span ref={ref}>
      {count.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
