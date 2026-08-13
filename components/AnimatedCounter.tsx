"use client";

import React, { useState, useEffect, useRef } from "react";

interface AnimatedCounterProps {
  targetValue: number; // Target number to reach (e.g. 5000, 50, 4.8, 650)
  prefix?: string; // e.g. "₹"
  suffix?: string; // e.g. "+", "Cr+", "x"
  duration?: number; // In milliseconds
  decimals?: number; // Number of decimal places
}

export default function AnimatedCounter({
  targetValue,
  prefix = "",
  suffix = "",
  duration = 2000,
  decimals = 0,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          startCountUp();
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      {
        threshold: 0.1,
      }
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [targetValue]);

  const startCountUp = () => {
    let startTimestamp: number | null = null;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function: easeOutQuad
      const easedProgress = progress * (2 - progress);
      const currentValue = easedProgress * targetValue;
      
      setCount(currentValue);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(targetValue);
      }
    };
    
    window.requestAnimationFrame(step);
  };

  return (
    <span ref={elementRef} className="inline-block transition-transform duration-300 hover:scale-105">
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}
