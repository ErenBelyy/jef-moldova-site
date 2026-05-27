"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimationFrame, useMotionValue } from "framer-motion";
import { fadeUpVariant } from "@/lib/utils";

const PARTNERS = [
  { name: "Uniunea Europeană", abbr: "UE" },
  { name: "Consiliul Europei", abbr: "CoE" },
  { name: "JEF Europe", abbr: "JEF" },
  { name: "Erasmus+", abbr: "E+" },
  { name: "UNDP Moldova", abbr: "UNDP" },
  { name: "Fundația Soros", abbr: "SOROS" },
  { name: "Delegația UE în Moldova", abbr: "DEL" },
  { name: "Friedrich Naumann", abbr: "FNF" },
  { name: "Casa Europei", abbr: "CE" },
  { name: "PNUD Moldova", abbr: "PNUD" },
];

function InfiniteTrack({ reversed = false }: { reversed?: boolean }) {
  const x = useMotionValue(reversed ? -1080 : 0);
  const trackRef = useRef(0);

  useAnimationFrame((_, delta) => {
    const speed = 0.04;
    trackRef.current += reversed ? delta * speed : -delta * speed;
    if (!reversed && trackRef.current < -1080) trackRef.current = 0;
    if (reversed && trackRef.current > 0) trackRef.current = -1080;
    x.set(trackRef.current);
  });

  return (
    <motion.div className="flex gap-6" style={{ x }}>
      {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((p, i) => (
        <div
          key={i}
          className="flex-shrink-0 w-44 h-16 rounded-xl glass border border-white/5 hover:border-emerald-500/20 flex items-center justify-center gap-3 px-4 transition-all duration-300 group cursor-default"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <span className="font-mono text-[9px] text-emerald-400 font-bold">{p.abbr}</span>
          </div>
          <span className="text-white/30 text-xs font-medium group-hover:text-white/60 transition-colors truncate">
            {p.name}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

export function PartnersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative overflow-hidden" ref={ref} id="parteneri">
      <div className="absolute inset-0 bg-gradient-to-b from-jef-darkGreen/20 to-transparent" />

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-jef-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-jef-dark to-transparent z-10 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl mb-12">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center"
        >
          <motion.span
            variants={fadeUpVariant}
            custom={0}
            className="font-mono text-xs text-emerald-400 tracking-widest uppercase mb-4 block"
          >
            ── Parteneri & susținători
          </motion.span>
          <motion.h2
            variants={fadeUpVariant}
            custom={0.1}
            className="font-display text-3xl md:text-4xl font-bold text-white"
          >
            Împreună construim{" "}
            <span className="gradient-text">mai mult</span>
          </motion.h2>
        </motion.div>
      </div>

      <div className="space-y-4 overflow-hidden">
        <div className="overflow-hidden">
          <InfiniteTrack />
        </div>
        <div className="overflow-hidden">
          <InfiniteTrack reversed />
        </div>
      </div>
    </section>
  );
}