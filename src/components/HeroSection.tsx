"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Play, Globe } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { gsap } from "gsap";

const HeroScene = dynamic(
  () => import("@/components/HeroScene").then((m) => ({ default: m.HeroScene })),
  { ssr: false }
);

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 180]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-badge",
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.2, ease: "back.out(1.7)" }
      );
      gsap.fromTo(
        ".hero-line",
        { opacity: 0, y: 50, skewY: 3 },
        { opacity: 1, y: 0, skewY: 0, duration: 1, stagger: 0.12, delay: 0.4, ease: "expo.out" }
      );
      gsap.fromTo(
        ".hero-sub",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.9, ease: "expo.out" }
      );
      gsap.fromTo(
        ".hero-cta",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, delay: 1.1, ease: "expo.out" }
      );
      gsap.fromTo(
        ".hero-stats",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, delay: 1.4, ease: "expo.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const stats = [
    { value: "500+", label: "Membri activi" },
    { value: "12+", label: "Ani de activitate" },
    { value: "80+", label: "Proiecte realizate" },
    { value: "30+", label: "Țări partenere" },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-jef-dark via-jef-darkGreen/50 to-jef-dark" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-900/25 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-green-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-emerald-600/10 blur-[80px] rounded-full pointer-events-none" />

      {/* 3D Scene */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 pointer-events-none"
      >
     {/* <HeroScene /> */}   
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center flex-1 container mx-auto px-6 max-w-7xl pt-32 pb-24">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="hero-badge opacity-0 inline-flex items-center gap-2 mb-8">
            <span className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-emerald-500/30 text-emerald-400 text-sm font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Tineri Federaliști Europeni — Moldova
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-display font-bold leading-[0.92] tracking-tight mb-8 overflow-hidden"
          >
            <div className="hero-line opacity-0 overflow-hidden">
              <span className="block text-[clamp(48px,8vw,110px)] text-white">
                Construim
              </span>
            </div>
            <div className="hero-line opacity-0 overflow-hidden">
              <span className="block text-[clamp(48px,8vw,110px)] gradient-text">
                Europa
              </span>
            </div>
            <div className="hero-line opacity-0 overflow-hidden">
              <span className="block text-[clamp(48px,8vw,110px)] text-white/30">
                de mâine
              </span>
            </div>
          </h1>

          {/* Subtitle */}
          <p className="hero-sub opacity-0 text-white/50 text-xl md:text-2xl max-w-2xl leading-relaxed mb-10 font-light">
            JEF Moldova reunește tinerii care cred în valorile europene, democrație
            și un viitor comun. Alătură-te mișcării care modelează destinul Moldovei.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <Link
              href="/oportunitati"
              className="hero-cta opacity-0 group flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 text-black font-bold text-base hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-[1.03]"
            >
              Descoperă Oportunități
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="/stiri"
              className="hero-cta opacity-0 group flex items-center justify-center gap-3 px-8 py-4 rounded-xl glass border border-white/10 text-white/80 hover:text-white font-medium text-base transition-all duration-300 hover:border-emerald-500/30"
            >
              <Play size={16} className="text-emerald-400" />
              Ultimele Știri
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="hero-stats opacity-0">
                <div className="font-display text-3xl md:text-4xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-white/40 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="font-mono text-xs tracking-widest">SCROLL</span>
        <ChevronDown size={16} />
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-jef-dark to-transparent pointer-events-none" />
    </section>
  );
}