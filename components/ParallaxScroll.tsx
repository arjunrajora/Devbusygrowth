"use client";

import React, { useRef, useEffect, ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  speed?: number; // Speed ratio, e.g. -0.2 (moves opposite) or 0.1 (moves with scroll)
  className?: string;
}

export default function ParallaxScroll({ children, speed = 0.1, className = "" }: ParallaxProps) {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    // Check if device is mobile (for performance, we skip scroll-parallax on screens < 768)
    if (window.innerWidth < 768) return;

    const target = targetRef.current;
    if (!target) return;

    let isScheduled = false;

    const handleScroll = () => {
      if (!isScheduled) {
        isScheduled = true;
        requestAnimationFrame(() => {
          if (target) {
            const rect = target.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // Check if element is within viewport margins
            if (rect.top < viewportHeight && rect.bottom > 0) {
              const scrolledAmount = window.scrollY;
              // Calculate offset relative to initial scroll position
              const yOffset = scrolledAmount * speed;
              target.style.transform = `translate3d(0, ${yOffset}px, 0)`;
            }
          }
          isScheduled = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Fire once initially
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [speed]);

  return (
    <div ref={targetRef} className={`will-change-transform transition-transform duration-100 ease-out ${className}`}>
      {children}
    </div>
  );
}
