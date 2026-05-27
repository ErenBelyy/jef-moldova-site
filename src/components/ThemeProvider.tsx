"use client";

import React from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Fallback/no-op provider to avoid adding a runtime dependency here.
  return <>{children}</>;
}