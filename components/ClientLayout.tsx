"use client";

import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import Background3D from "./Background3D";

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
      <Background3D />
      {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}
      <div className={`transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        {children}
      </div>
    </>
  );
}
