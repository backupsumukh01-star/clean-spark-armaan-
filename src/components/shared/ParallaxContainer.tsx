"use client";

import { useEffect, useRef } from "react";

export default function ParallaxContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handle = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / innerWidth;
      const y = (e.clientY - innerHeight / 2) / innerHeight;

      el.style.transform = `
        perspective(1000px)
        rotateY(${x * 6}deg)
        rotateX(${-y * 6}deg)
      `;
    };

    // desktop only
    if (window.innerWidth > 768) {
      window.addEventListener("mousemove", handle);
    }

    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <div
      ref={ref}
      className="transition-transform duration-300 ease-out will-change-transform"
    >
      {children}
    </div>
  );
}
