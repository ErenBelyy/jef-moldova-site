"use client";

import { useState, useEffect } from "react";
import { EUParliamentLoader } from "@/components/EUParliamentLoader";

export function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // Only show loader once per session
    const seen = sessionStorage.getItem("jef_loader_shown");
    if (seen) {
      setLoaded(true);
    } else {
      setShown(true);
    }
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem("jef_loader_shown", "1");
    setLoaded(true);
    setShown(false);
  };

  return (
    <>
      {shown && <EUParliamentLoader onComplete={handleComplete} />}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: loaded ? "auto" : "none",
        }}
      >
        {children}
      </div>
    </>
  );
}