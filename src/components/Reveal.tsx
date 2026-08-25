"use client";

import { useEffect, useRef, useState } from "react";

type RevealAnimation = "up" | "left" | "right" | "fade";

const animationClass: Record<RevealAnimation, string> = {
  up: "reveal-up",
  left: "reveal-left",
  right: "reveal-right",
  fade: "reveal-fade",
};

interface RevealProps {
  children: React.ReactNode;
  animation?: RevealAnimation;
  delay?: number;
  className?: string;
}

export default function Reveal({
  children,
  animation = "up",
  delay = 0,
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={visible ? { animationDelay: `${delay}ms` } : undefined}
      className={`${className} ${
        visible ? animationClass[animation] : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
