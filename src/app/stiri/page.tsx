"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search, Filter, ArrowUpRight, Clock, Tag, X } from "lucide-react";
import { formatDate, fadeUpVariant, staggerContainerVariant } from "@/lib/utils";

const CATEGORIES = ["Toate", "Evenimente", "Oportunități", "Politici Europene", "Erasmus+", "Voluntariat", "Training", "Rapoarte"];

const ALL_ARTICLES = [
  {
    id: "1", slug: "jef-moldova-conferinta-europeana-2024",
    title: "JEF Moldova organizează Conferința Europeană a Tineretului 2024",
    excerpt: "Peste 200 de tineri din 15 țări se vor reuni la Chișinău pentru a dezbate viitorul Europei extinse și rolul Moldovei în proiectul european.",
    category: "Evenimente", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
    publishedAt: "2024-11-15", readingTime: 4, tags: ["conferință", "tineret"],
  },
  {
    id: "2", slug: "stagiu-parlamentul-european-2025",
    title: "Stagii remunerate la Parlamentul European — Aplică până pe 15 Decembrie",
    excerpt: "Programul Schuman oferă tinerilor din Moldova posibilitatea de a lucra 5 luni la Bruxelles sau Strasbourg, cu o indemnizație de 1.400 EUR/lună.",
    category: "Oportunități", image: "https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?w=600&q=80",
    publishedAt: "2024-11-10", readingTime: 3, tags: ["stagiu", "parlamentul-european"],
  },
  {
    id: "3", slug: "moldova-ue-progres-aderare-2024",
    title: "Moldova accelerează reformele pentru aderarea la UE: Bilanț 2024",
    excerpt: "Raportul de progres al Comisiei Europene evidențiază pașii concreți făcuți de Moldova în domeniul statului de drept și reformei judiciare.",
    category: "Politici Europene", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80",
    publishedAt: "2024-11-08", readingTime: 6, tags: ["moldova", "ue"],
  },
  {
    id: "4", slug: "erasmus-plus-ghid-2025",
    title: "Ghid complet Erasmus+ 2025: Cum aplici și ce trebuie să știi",
    excerpt: "De la granturi pentru mobilitate individuală la proiecte de parteneriat — tot ce ai nevoie pentru a accesa fondurile europene.",
    category: "Erasmus+", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80",
    publishedAt: "2024-11-05", readingTime: 7, tags: ["erasmus", "burse"],
  },
  {
    id: "5", slug: "voluntariat-european-moldova",
    title: "Corpul European de Solidaritate: 500 locuri disponibile pentru tinerii moldoveni",
    excerpt: "Uniunea Europeană deschide noi locuri în programul de voluntariat, cu finanțare integrală pentru deplasare, cazare și masă.",
    category: "Voluntariat", image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80",
    publishedAt: "2024-10-28", readingTime: 4, tags: ["voluntariat", "solidaritate"],
  },
  {
    id: "6", slug: "training-leadership-chisinau",
    title: "Training de Leadership pentru Tineri — Chișinău, Ianuarie 2025",
    excerpt: "JEF Moldova organizează un training intensiv de 3 zile dedicat dezvoltării competențelor de leadership și advocacy pentru tinerii între 18-30 de ani.",
    category: "Training", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    publishedAt: "2024-10-20", readingTime: 3, tags: ["training", "leadership"],
  },
  {
    id: "7", slug: "raport-activitate-jef-2024",
    title: "Raport de activitate JEF Moldova 2024: Un an de realizări",
    excerpt: "Trecem în revistă proiectele, evenimentele și impactul pe care l-am creat împreună în 2024 — un an marcat de alegeri europene și progrese în procesul de aderare.",
    category: "Rapoarte", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
    publishedAt: "2024-10-15", readingTime: 8, tags: ["raport", "activitate"],
  },
  {
    id: "8", slug: "tineri-ambasadori-europeni-selectie",
    title: "Se deschide selecția pentru Rețeaua Tinerilor Ambasadori Europeni",
    excerpt: "Cauți o modalitate de a promova valorile europene în comunitatea ta? Aplică la programul care formează ambasadorii Europei de mâine.",
    category: "Oportunități", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&q=80",
    publishedAt: "2024-10-10", readingTime: 3, tags: ["ambasadori", "selectie"],
  },
  {
    id: "9", slug: "dezbatere-viitorul-europei-chisinau",
    title: "Dezbatere publică: Viitorul Europei — Ce rol joacă Moldova?",
    excerpt: "JEF Moldova invită cetățenii la o dezbatere deschisă despre extinderea UE, democrație și rolul tinerilor în construirea Europei federale.",
    category: "Evenimente", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80",
    publishedAt: "2024-10-05", readingTime: 4, tags: ["dezbatere", "viitor"],
  },
];

function ArticleCard({ article, index }: { article: typeof ALL_ARTICLES[0]; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-2xl glass border border-white/5 hover:border-emerald-500/20 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-500/10"
    >
      <div className="relative h-52 overflow-hidden">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-jef-dark/80 to-transparent" />
        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass border border-emerald-500/20 text-emerald-400 text-xs font-medium">
          <Tag size={10} />{article.category}
        </span>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 text-white/25 text-xs mb-3">
          <span>{formatDate(article.publishedAt)}</span>
          <span>·</span>
          <span className="flex items-center gap-1"><Clock size={10} />{article.readingTime} min</span>
        </div>
        <h3 className="font-display font-bold text-white text-lg leading-snug mb-3 group-hover:text-emerald-300 transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-white/40 text-sm leading-relaxed line-clamp-2 mb-5">{article.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {article.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-xs text-white/20 px-2 py-0.5 rounded-full border border-white/10">#{tag}</span>
            ))}
          </div>
          <Link href={`/stiri/${article.slug}`} className="inline-flex items-center gap-1 text-emerald-400 text-sm font-medium hover:gap-2 transition-all">
            Citește <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function StiriPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Toate");

  const filtered = useMemo(() => {
    return ALL_ARTICLES.filter((a) => {
      const matchesCategory = activeCategory === "Toate" || a.category === activeCategory;
      const q = query.toLowerCase();
      const matchesQuery = !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.tags.some((t) => t.includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  const featured = ALL_ARTICLES[0];

  return (
    <div className="min-h-screen bg-jef-dark">
      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-900/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 max-w-7xl">
          {/* Featured article */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20"
          >
            <span className="font-mono text-xs text-emerald-400 tracking-widest uppercase mb-4 block">── Articol principal</span>
            <Link href={`/stiri/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 rounded-3xl glass border border-white/5 hover:border-emerald-500/20 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10">
              <div className="relative h-64 lg:h-auto rounded-2xl overflow-hidden">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-tr from-jef-dark/60 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                  ★ ARTICOL RECOMANDAT
                </span>
              </div>
              <div className="flex flex-col justify-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass border border-purple-500/20 text-purple-400 text-xs font-medium w-fit mb-5">
                  <Tag size={10} />{featured.category}
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white group-hover:text-emerald-300 transition-colors leading-tight mb-4">
                  {featured.title}
                </h2>
                <p className="text-white/50 leading-relaxed mb-6">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-white/30 text-sm">
                  <span>{formatDate(featured.publishedAt)}</span>
                  <span>·</span>
                  <span>{featured.readingTime} min citire</span>
                  <ArrowUpRight size={16} className="text-emerald-400 ml-auto group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Title + search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
                Toate <span className="gradient-text">știrile</span>
              </h1>
              <p className="text-white/40 mt-2">{filtered.length} articole găsite</p>
            </div>
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Caută articole..."
                className="w-full md:w-72 pl-10 pr-10 py-3 rounded-xl glass border border-white/10 focus:border-emerald-500/40 bg-transparent text-white placeholder-white/25 text-sm outline-none transition-colors"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Category filters */}
          <div className="flex gap-2 flex-wrap mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                    : "glass border border-white/10 text-white/40 hover:text-white hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((a, i) => (
                  <ArticleCard key={a.id} article={a} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24"
              >
                <p className="text-white/30 text-lg mb-2">Niciun articol găsit</p>
                <button onClick={() => { setQuery(""); setActiveCategory("Toate"); }} className="text-emerald-400 text-sm hover:underline">
                  Resetează filtrele
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}