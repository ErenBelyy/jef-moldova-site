"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search, ArrowUpRight, MapPin, Calendar, ExternalLink, Clock, Zap, X, ChevronRight, Star } from "lucide-react";
import { formatDate, opportunityTypeLabels, opportunityTypeColors } from "@/lib/utils";

const OPPORTUNITIES = [
  {
    id: "1", slug: "stagiu-parlamentul-european-2025",
    title: "Stagiu Schuman — Parlamentul European",
    organization: "Parlamentul European",
    description: "5 luni de experiență în inima democrației europene, la Bruxelles sau Strasbourg. Indemnizație 1.400 EUR/lună, toate cheltuielile acoperite.",
    type: "internship" as const, location: "Bruxelles / Strasbourg", country: "🇧🇪🇫🇷",
    deadline: "2024-12-15", duration: "5 luni", stipend: true, stipendAmount: "1.400 EUR/lună",
    applicationUrl: "https://europarl.europa.eu",
    image: "https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?w=500&q=80",
    tags: ["parlamentul-european", "bruxelles", "politici"], featured: true,
    requirements: ["18-30 ani", "Cetățean UE sau din țări partenere", "Cunoașterea a 2 limbi UE"],
  },
  {
    id: "2", slug: "corpul-european-solidaritate-2025",
    title: "Corpul European de Solidaritate — Voluntariat Internațional",
    organization: "Comisia Europeană",
    description: "Voluntariat de 2-12 luni într-o țară europeană, cu transport, cazare, masă și indemnizație zilnică acoperite integral.",
    type: "volunteering" as const, location: "Diferite țări UE", country: "🇪🇺",
    deadline: "2025-01-31", duration: "2-12 luni", stipend: true, stipendAmount: "Finanțare integrală",
    applicationUrl: "https://europa.eu/youth/solidarity_ro",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&q=80",
    tags: ["voluntariat", "solidaritate", "europa"], featured: true,
    requirements: ["17-30 ani", "Motivație puternică", "Disponibilitate deplasare"],
  },
  {
    id: "3", slug: "erasmus-plus-mobilitate-tineri",
    title: "Erasmus+ Schimburi de Tineri — Apel 2025",
    organization: "ANCT Moldova",
    description: "Participă la schimburi internaționale de tineri finanțate prin Erasmus+. Grupuri de 10-60 tineri, proiecte tematice, finanțare 100%.",
    type: "erasmus" as const, location: "Europa", country: "🇪🇺",
    deadline: "2025-02-28", duration: "6-21 zile", stipend: true, stipendAmount: "Finanțare 100%",
    applicationUrl: "https://erasmusplus.md",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&q=80",
    tags: ["erasmus", "mobilitate", "educatie"], featured: false,
    requirements: ["13-30 ani", "Naționalitate moldoveană", "Proiect cu partener extern"],
  },
  {
    id: "4", slug: "training-leadership-jef-2025",
    title: "Training Intensiv: Leadership & Advocacy European",
    organization: "JEF Moldova",
    description: "3 zile de formare intensivă în leadership, comunicare politică, lobby și advocacy la nivel european. Limitat la 25 participanți.",
    type: "training" as const, location: "Chișinău, Moldova", country: "🇲🇩",
    deadline: "2025-01-10", duration: "3 zile", stipend: false, stipendAmount: "",
    applicationUrl: "/contact",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80",
    tags: ["leadership", "training", "advocacy"], featured: false,
    requirements: ["18-35 ani", "Implicare civică dovedită", "Scrisoare de motivație"],
  },
  {
    id: "5", slug: "proiect-youth-in-action",
    title: "Youth in Action — Proiecte Comunitare cu Finanțare EU",
    organization: "JEF Moldova & MYWC",
    description: "Granturi de până la 50.000 EUR pentru proiecte de tineret cu impact local și european. Sesiune de informare gratuită.",
    type: "project" as const, location: "Moldova", country: "🇲🇩",
    deadline: "2025-03-15", duration: "6-24 luni", stipend: true, stipendAmount: "Până la 50.000 EUR",
    applicationUrl: "/contact",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80",
    tags: ["proiect", "grant", "comunitate"], featured: false,
    requirements: ["ONG activ", "Parteneri din 3+ țări", "Experiență anterioară"],
  },
  {
    id: "6", slug: "conferinta-jef-europa-2025",
    title: "Congresul JEF Europa 2025 — Delegați din Moldova",
    organization: "JEF Europe",
    description: "Reprezintă Moldova la Congresul anual al JEF Europa! Costurile de participare sunt acoperite pentru 3 delegați selectați.",
    type: "conference" as const, location: "Lisabona, Portugalia", country: "🇵🇹",
    deadline: "2025-02-01", duration: "4 zile", stipend: true, stipendAmount: "Cheltuieli acoperite",
    applicationUrl: "/contact",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500&q=80",
    tags: ["congres", "jef-europe", "delegat"], featured: true,
    requirements: ["Membru JEF Moldova", "Cunoașterea unei limbi de lucru", "Recomandare internă"],
  },
];

type OpType = "toate" | "internship" | "volunteering" | "erasmus" | "training" | "project" | "conference";

function OpportunityCard({ opp, index }: { opp: typeof OPPORTUNITIES[0]; index: number }) {
  const colorClass = opportunityTypeColors[opp.type] ?? "bg-white/10 text-white/60 border-white/20";
  const typeLabel = opportunityTypeLabels[opp.type] ?? opp.type;
  const isUrgent = opp.deadline && new Date(opp.deadline) < new Date(Date.now() + 14 * 864e5);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-2xl glass border border-white/5 hover:border-emerald-500/20 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-500/10 flex flex-col"
    >
      {opp.featured && (
        <div className="absolute top-4 right-4 z-20">
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-[10px] font-bold">
            <Star size={8} className="fill-yellow-400" /> RECOMANDAT
          </span>
        </div>
      )}

      <div className="relative h-44 overflow-hidden">
        <img src={opp.image} alt={opp.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-jef-dark/80 to-transparent" />
        <div className="absolute bottom-4 left-4 flex gap-2">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${colorClass}`}>
            {typeLabel}
          </span>
          {isUrgent && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] font-bold">
              <Zap size={8} /> URGENT
            </span>
          )}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-white/30 text-xs mb-3">
          <span className="text-base">{opp.country}</span>
          <span className="flex items-center gap-1"><MapPin size={10} />{opp.location}</span>
        </div>

        <h3 className="font-display font-bold text-white text-lg leading-snug mb-2 group-hover:text-emerald-300 transition-colors line-clamp-2">
          {opp.title}
        </h3>
        <p className="text-white/40 text-xs mb-3">{opp.organization}</p>
        <p className="text-white/50 text-sm leading-relaxed line-clamp-2 mb-5 flex-1">{opp.description}</p>

        <div className="grid grid-cols-2 gap-3 mb-5">
          {opp.deadline && (
            <div className="p-3 rounded-xl bg-white/3 border border-white/5">
              <p className="text-white/25 text-[10px] uppercase tracking-wider mb-0.5">Termen limită</p>
              <p className="text-white/70 text-xs font-medium flex items-center gap-1"><Calendar size={10} />{formatDate(opp.deadline, "d MMM yyyy")}</p>
            </div>
          )}
          <div className="p-3 rounded-xl bg-white/3 border border-white/5">
            <p className="text-white/25 text-[10px] uppercase tracking-wider mb-0.5">Durată</p>
            <p className="text-white/70 text-xs font-medium flex items-center gap-1"><Clock size={10} />{opp.duration}</p>
          </div>
        </div>

        {opp.stipend && (
          <div className="flex items-center gap-2 mb-5 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
            <Zap size={12} className="text-emerald-400 flex-shrink-0" />
            <span className="text-emerald-400 text-xs font-medium">{opp.stipendAmount}</span>
          </div>
        )}

        <a
          href={opp.applicationUrl}
          target={opp.applicationUrl.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 text-black font-bold text-sm hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-[1.02] group/btn"
        >
          Aplică acum
          <ExternalLink size={13} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
}

const TYPE_FILTERS: { label: string; value: OpType }[] = [
  { label: "Toate", value: "toate" },
  { label: "Stagii", value: "internship" },
  { label: "Voluntariat", value: "volunteering" },
  { label: "Erasmus+", value: "erasmus" },
  { label: "Traininguri", value: "training" },
  { label: "Proiecte", value: "project" },
  { label: "Conferințe", value: "conference" },
];

export default function OportunitatiPage() {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState<OpType>("toate");
  const [showStipend, setShowStipend] = useState(false);

  const filtered = useMemo(() => {
    return OPPORTUNITIES.filter((o) => {
      const matchType = activeType === "toate" || o.type === activeType;
      const matchStipend = !showStipend || o.stipend;
      const q = query.toLowerCase();
      const matchQuery = !q || o.title.toLowerCase().includes(q) || o.description.toLowerCase().includes(q) || o.organization.toLowerCase().includes(q);
      return matchType && matchStipend && matchQuery;
    });
  }, [query, activeType, showStipend]);

  return (
    <div className="min-h-screen bg-jef-dark">
      {/* Page header */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-900/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-mono text-xs text-emerald-400 tracking-widest uppercase mb-4 block">── Descoperă & aplică</span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Oportunități{" "}
              <span className="gradient-text">europene</span>
              <br />
              <span className="text-white/20">pentru tine</span>
            </h1>
            <p className="text-white/50 text-xl max-w-2xl mb-12">
              Stagii, voluntariat, Erasmus+, traininguri și proiecte finanțate — tot ce ai nevoie pentru a-ți construi cariera europeană.
            </p>

            {/* Stats */}
            <div className="flex gap-8 flex-wrap">
              {[
                { v: `${OPPORTUNITIES.length}`, l: "Oportunități active" },
                { v: OPPORTUNITIES.filter(o => o.stipend).length.toString(), l: "Cu finanțare" },
                { v: "30+", l: "Țări partenere" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="font-display text-3xl font-bold gradient-text">{s.v}</div>
                  <div className="text-white/40 text-sm">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Filter bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-10">
            <div className="flex gap-2 flex-wrap flex-1">
              {TYPE_FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActiveType(f.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeType === f.value
                      ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                      : "glass border border-white/10 text-white/40 hover:text-white"
                  }`}
                >
                  {f.label}
                </button>
              ))}
              <button
                onClick={() => setShowStipend(!showStipend)}
                className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-all duration-300 ${
                  showStipend
                    ? "bg-yellow-500/20 border border-yellow-500/40 text-yellow-400"
                    : "glass border border-white/10 text-white/40 hover:text-white"
                }`}
              >
                <Zap size={12} /> Cu finanțare
              </button>
            </div>

            <div className="relative w-full lg:w-72">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Caută oportunități..."
                className="w-full pl-10 pr-10 py-3 rounded-xl glass border border-white/10 focus:border-emerald-500/40 bg-transparent text-white placeholder-white/25 text-sm outline-none transition-colors"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          <p className="text-white/30 text-sm mb-8">{filtered.length} oportunități găsite</p>

          {/* Grid */}
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((opp, i) => (
                <OpportunityCard key={opp.id} opp={opp} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="text-white/30 text-lg mb-2">Nicio oportunitate găsită</p>
              <button onClick={() => { setQuery(""); setActiveType("toate"); setShowStipend(false); }} className="text-emerald-400 text-sm hover:underline">
                Resetează filtrele
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}