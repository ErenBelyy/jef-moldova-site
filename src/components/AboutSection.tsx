"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Users, Globe, Award, TrendingUp } from "lucide-react";
import { fadeUpVariant, staggerContainerVariant } from "@/lib/utils";

const values = [
  {
    icon: Globe,
    title: "Federalism European",
    desc: "Promovăm o Europă unită, în care statele cooperează pentru prosperitate și pace comune.",
  },
  {
    icon: Users,
    title: "Participare Democratică",
    desc: "Implicăm tinerii în procese democratice, de la nivel local până la instituțiile europene.",
  },
  {
    icon: Award,
    title: "Dezvoltare Personală",
    desc: "Oferim instrumente, traininguri și mentori pentru liderii de mâine ai Moldovei.",
  },
  {
    icon: TrendingUp,
    title: "Integrare Europeană",
    desc: "Susținem activ parcursul european al Moldovei prin advocacy și proiecte concrete.",
  },
];

const timeline = [
  { year: "2009", event: "Fondarea JEF Moldova la Chișinău" },
  { year: "2012", event: "Primul proiect Erasmus+ coordonat de JEF Moldova" },
  { year: "2015", event: "Lansarea Rețelei de Tineri Ambasadori Europeni" },
  { year: "2018", event: "Conferința Internațională JEF — 300 participanți din 20 țări" },
  { year: "2020", event: "Trecerea la platforme digitale — 500+ tineri implicați online" },
  { year: "2022", event: "Campania #MoldovaPentruEuropa — 10.000 semnături colectate" },
  { year: "2024", event: "Extinderea la 15 secțiuni regionale în toată Moldova" },
];

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const timelineInView = useInView(timelineRef, { once: true, margin: "-50px" });

  return (
    <section id="despre" className="section-padding relative overflow-hidden" ref={ref}>
      {/* BG */}
      <div className="absolute inset-0 bg-gradient-to-b from-jef-dark to-jef-darkGreen/30" />
      <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-emerald-900/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        {/* Top section — mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={staggerContainerVariant}
          >
            <motion.span
              variants={fadeUpVariant}
              custom={0}
              className="font-mono text-xs text-emerald-400 tracking-widest uppercase mb-4 block"
            >
              ── Cine suntem
            </motion.span>
            <motion.h2
              variants={fadeUpVariant}
              custom={0.1}
              className="font-display text-4xl md:text-6xl font-bold text-white mb-8 leading-tight"
            >
              O mișcare,{" "}
              <span className="gradient-text">nu doar</span>{" "}
              o organizație
            </motion.h2>
            <motion.p
              variants={fadeUpVariant}
              custom={0.2}
              className="text-white/50 text-lg leading-relaxed mb-6"
            >
              JEF Moldova — Tinerii Federaliști Europeni este o organizație de tineret
              apartidică, fondată cu convingerea că viitorul Moldovei este în Europa.
              Facem parte din rețeaua JEF Europe, prezentă în peste 30 de țări.
            </motion.p>
            <motion.p
              variants={fadeUpVariant}
              custom={0.3}
              className="text-white/40 text-base leading-relaxed"
            >
              Prin proiecte, campanii și oportunități de mobilitate, conectăm tinerii
              moldoveni cu instituțiile europene, cu valorile democratice și cu rețele
              de tineri din toată Europa.
            </motion.p>
          </motion.div>

          {/* Values grid */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={staggerContainerVariant}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {values.map((v, i) => (
              <motion.div
                key={i}
                variants={fadeUpVariant}
                custom={i * 0.1}
                className="p-6 rounded-2xl glass border border-white/5 hover:border-emerald-500/20 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                  <v.icon size={18} className="text-emerald-400" />
                </div>
                <h3 className="font-display font-bold text-white text-base mb-2">
                  {v.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="font-mono text-xs text-emerald-400 tracking-widest uppercase mb-4 block">
              ── Istoria noastră
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              15 ani de{" "}
              <span className="gradient-text">impact</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Center line */}
            <motion.div
              className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-emerald-500/50 via-emerald-500/20 to-transparent"
              initial={{ height: 0 }}
              animate={timelineInView ? { height: "100%" } : {}}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex items-center gap-8 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                    <div className="inline-block p-5 rounded-2xl glass border border-white/5 hover:border-emerald-500/20 transition-all duration-300">
                      <span className="font-display font-bold text-emerald-400 text-lg block mb-1">
                        {item.year}
                      </span>
                      <p className="text-white/60 text-sm">{item.event}</p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-jef-dark shadow-lg shadow-emerald-500/50" />
                    <div className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping" />
                  </div>

                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}