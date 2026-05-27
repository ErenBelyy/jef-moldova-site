"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Acasă" },
  { href: "/stiri", label: "Știri" },
  { href: "/oportunitati", label: "Oportunități" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { scrollY } = useScroll();

  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(2,13,7,0)", "rgba(2,13,7,0.85)"]
  );

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (v: number) => {
      setScrolled(v > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        style={{ backgroundColor: navBackground as unknown as string }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled && "backdrop-blur-xl border-b border-white/5"
        )}
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center">
                  <span className="font-display font-bold text-sm text-black">JEF</span>
                </div>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-emerald-500 to-green-400 opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-300" />
              </div>
              <div className="hidden sm:block">
                <span className="font-display font-bold text-lg text-white tracking-tight">
                  JEF Moldova
                </span>
                <div className="h-px w-0 group-hover:w-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-500" />
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group",
                      isActive
                        ? "text-emerald-400"
                        : "text-white/70 hover:text-white"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
                        transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-9 h-9 rounded-lg glass flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              <Link
                href="/contact"
                className="hidden md:flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-green-500 text-black font-semibold text-sm hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
              >
                Implică-te
              </Link>

              <button
                className="md:hidden w-9 h-9 rounded-lg glass flex items-center justify-center"
                onClick={() => setIsOpen(!isOpen)}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="x"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={18} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-jef-dark/95 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
            />
            <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8 px-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "font-display text-4xl font-bold transition-colors",
                      pathname === link.href
                        ? "gradient-text"
                        : "text-white/60 hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <Link
                  href="/contact"
                  className="mt-4 px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 text-black font-bold text-lg"
                >
                  Implică-te
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}