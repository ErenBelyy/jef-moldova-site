"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { fadeUpVariant } from "@/lib/utils";

export function JoinSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      {/* BG gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-jef-dark via-jef-midGreen/20 to-jef-dark" />

      {/* Glowing orb */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[400px] bg-emerald-500/15 blur-[120px] rounded-full" />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* EU Stars decoration */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const r = 280;
          return (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2"
              style={{
                x: Math.cos(angle) * r - 6,
                y: Math.sin(angle) * r * 0.4 - 6,
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3,
                delay: i * 0.25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Star size={12} className="text-yellow-400/60 fill-yellow-400/60" />
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-4xl text-center">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-8"
        >
          <motion.span
            variants={fadeUpVariant}
            custom={0}
            className="font-mono text-xs text-emerald-400 tracking-widest uppercase"
          >
            ── Alătură-te mișcării
          </motion.span>

          <motion.h2
            variants={fadeUpVariant}
            custom={0.1}
            className="font-display text-5xl md:text-7xl font-bold leading-tight"
          >
            <span className="text-white">Viitorul Europei</span>
            <br />
            <span className="gradient-text">începe cu tine</span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariant}
            custom={0.2}
            className="text-white/50 text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Fii parte din rețeaua de tineri care fac diferența. Accesează oportunități
            exclusive, participă la evenimente europene și construiește un viitor mai bun
            pentru Moldova.
          </motion.p>

          <motion.div
            variants={fadeUpVariant}
            custom={0.3}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 text-black font-bold text-lg hover:shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-[1.03]"
            >
              Devino Membru JEF
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="/oportunitati"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl glass border border-white/10 text-white/70 hover:text-white font-medium text-lg transition-all duration-300 hover:border-emerald-500/30"
            >
              Explorează Oportunități
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={fadeUpVariant}
            custom={0.4}
            className="flex items-center justify-center gap-4 pt-4"
          >
            <div className="flex -space-x-2">
              {[
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop",
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Membru JEF"
                  className="w-9 h-9 rounded-full border-2 border-jef-dark object-cover"
                />
              ))}
            </div>
            <p className="text-white/40 text-sm">
              Alătură-te celor <span className="text-white/70 font-medium">500+</span> membri activi
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}