"use client";

import React, { useEffect, useState } from "react";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  showSubtitle?: boolean;
  darkBackground?: boolean;
}

export default function Logo({
  className = "",
  iconOnly = false,
  showSubtitle = true,
  darkBackground = false,
}: LogoProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (iconOnly) {
    return (
      <div className={`inline-flex items-center select-none group ${className}`}>
        <div className={`relative transition-transform duration-300 group-hover:scale-105 ${mounted ? "opacity-100 scale-100" : "scale-90 opacity-0"}`}>
          <img
            src="/logo-icon-transparent.png"
            alt="TheBusyGrowth Monogram"
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center select-none group ${className}`}>
      <div className={`relative transition-transform duration-300 group-hover:scale-105 ${mounted ? "opacity-100 scale-100" : "scale-95 opacity-0"}`}>
        {darkBackground ? (
          /* Forced dark background logo (e.g. Footer) */
          <img
            src="/logo-transparent-dark.png"
            alt="TheBusyGrowth - Digital Marketing Agency"
            className="h-12 sm:h-14 md:h-16 w-auto object-contain"
          />
        ) : (
          /* Responsive light/dark theme switcher */
          <>
            <img
              src="/logo-transparent.png"
              alt="TheBusyGrowth - Digital Marketing Agency"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain dark:hidden"
            />
            <img
              src="/logo-transparent-dark.png"
              alt="TheBusyGrowth - Digital Marketing Agency"
              className="hidden h-12 sm:h-14 md:h-16 w-auto object-contain dark:block"
            />
          </>
        )}
      </div>
    </div>
  );
}

