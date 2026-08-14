"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { BUSINESS_CONFIG } from "./businessConfig";

export default function WhatsAppButton() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Show tooltip after 5 seconds to draw soft attention
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted || pathname?.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip */}
      <div
        className={`rounded-2xl bg-white dark:bg-[#071a3d] border border-slate-200 dark:border-slate-800 px-4 py-2 text-xs font-semibold text-[#071a3d] dark:text-slate-100 shadow-xl transition-all duration-500 scale-95 origin-right ${
          showTooltip
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 translate-x-4 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00a651] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00a651]"></span>
          </span>
          <span>Operators Online</span>
        </div>
      </div>

      {/* Circular Button */}
      <a
        href={BUSINESS_CONFIG.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#00a651] text-white shadow-lg shadow-[#00a651]/30 transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-xl hover:shadow-[#00a651]/40"
        aria-label="Chat on WhatsApp"
      >
        {/* Subtle breathing ring around button */}
        <span className="absolute inset-0 rounded-full border-2 border-[#00a651] opacity-0 group-hover:animate-ping [animation-duration:1.5s]"></span>

        {/* WhatsApp Icon */}
        <svg className="h-7 w-7 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.077 4.928C17.191 3.041 14.683 2 12.006 2 6.499 2 2.006 6.493 2.006 12c0 1.76.46 3.483 1.333 5l-1.333 4.86 5.013-1.313c1.452.793 3.087 1.207 4.78 1.207h.004c5.507 0 10-4.493 10-10 0-2.677-1.041-5.185-2.926-7.072zM12.006 20.006c-1.529 0-3.03-.418-4.341-1.209l-.311-.187-2.973.78.793-2.894-.205-.327a7.99 7.99 0 01-1.229-4.169c0-4.411 3.593-8.006 8.006-8.006 2.138 0 4.148.832 5.659 2.345 1.51 1.513 2.342 3.525 2.342 5.661 0 4.412-3.593 8.006-8.006 8.006zm4.387-5.992c-.24-.12-1.423-.701-1.644-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06a6.565 6.565 0 01-1.928-1.189 7.234 7.234 0 01-1.334-1.658c-.14-.24-.015-.369.106-.489.11-.108.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.195-.47-.393-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2.001 0 1.18.86 2.32 1.02 2.48.16.16 1.69 2.581 4.1 3.621.573.247 1.02.395 1.368.505.576.183 1.1.157 1.513.097.46-.067 1.423-.58 1.624-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
        </svg>
      </a>
    </div>
  );
}
