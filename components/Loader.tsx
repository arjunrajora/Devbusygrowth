"use client";

import React, { useState, useEffect } from "react";
import { BUSINESS_CONFIG } from "./businessConfig";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check session storage to prevent showing loader on sub-pages or refreshes
    const hasLoaded = sessionStorage.getItem("tb_initial_loaded");
    if (hasLoaded) {
      onComplete();
      return;
    }

    setShouldRender(true);

    // Simulate progress bar increment
    const duration = 1800; // Total duration in ms
    const intervalTime = 30;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Wait briefly for complete visual feedback
          setTimeout(() => {
            setIsVisible(false);
            sessionStorage.setItem("tb_initial_loaded", "true");
            setTimeout(() => {
              onComplete();
            }, 600); // Wait for transition fade duration
          }, 300);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (!shouldRender || !isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#071a3d] transition-all duration-700 ${
        progress >= 100 ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      <div className="flex flex-col items-center max-w-xs w-full px-4">
        {/* Animated Brand Logo Container */}
        <div className="relative mb-8 transition-transform duration-1000 animate-pulse">
          <img
            src="/logo-transparent-dark.png"
            alt={BUSINESS_CONFIG.name}
            className="h-16 sm:h-20 w-auto object-contain select-none"
          />
        </div>

        {/* Dynamic Percentage */}
        <div className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#00a651] font-mono">
          Loading Operators... {Math.round(progress)}%
        </div>

        {/* Premium Progress Bar */}
        <div className="h-1 w-full rounded-full bg-slate-800/80 overflow-hidden border border-white/5 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#0d60c4] to-[#00a651] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
