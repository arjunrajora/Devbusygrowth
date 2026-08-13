"use client";

import React, { useState, useEffect } from "react";
import Loader from "./Loader";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if initial loader has already run in session
    const hasLoaded = sessionStorage.getItem("tb_initial_loaded");
    if (hasLoaded) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <>
      {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}
      <div className={`transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        {children}
      </div>
    </>
  );
}
