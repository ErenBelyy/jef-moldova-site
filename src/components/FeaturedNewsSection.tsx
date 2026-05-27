"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Clock, Tag } from "lucide-react";
import { formatDate, fadeUpVariant, staggerContainerVariant } from "@/lib/utils";

const DEMO_ARTICLES = [
  {
    id: "1",
    slug: "jef-moldova-conferinta-europeana-2024",
    title: "JEF Moldova organizează Conferința Europeană a Tineretului 2024",
    excerpt:
      "Peste 200 de tineri din 15 țări se vor reuni la Chișinău pentru a dezbate viitorul Europei extinse și rolul Moldovei în proiectul european.",
    category: "Evenimente",
    categoryColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    publishedAt: "2024-11-15",
    readingTime: 4,
    featured: true,
    tags: ["conferință", "tineret", "europa"],
  },
  {
    id: "2",
    slug: "oportunitate-stagiu-parlamentul-european",
    title: "Stagii remunerate la Parlamentul European — Aplică până pe 15 Decembrie",
    excerpt:
      "Programul Schuman oferă tinerilor din Moldova posibilitatea de a lucra 5 luni la Bruxelles sau Strasbourg, cu o indemnizație lunară de 1.400 EUR.",
    category: "Oportunități",
    categoryColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    image: "https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?w=800&q=80",
    publishedAt: "2024-11-10",
    readingTime: 3,
    featured: false,
    tags: ["stagiu", "parlamentul-european", "bruxelles"],
  },
  {
    id: "3",
    slug: "moldova-ue-progres-aderare",
    title: "Moldova accelerează reformele pentru aderarea la UE: Bilanț 2024",
    excerpt:
      "Raportul de progres al Comisiei Europene evidențiază pașii concreți făcuți de Moldova în domeniul statului de drept, reformei judiciare și combaterii corupției.",
    category: "Politici Europene",
    categoryColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    publishedAt: "2024-11-08",
    readingTime: 6,
    featured: false,
    tags: ["moldova", "ue", "aderare", "reforme"],
  },
  {
    id: "4",
    slug: "erasmus-plus-ghid-aplicare-2025",
    title: "Ghid complet Erasmus+ 2025: Cum aplici și ce trebuie să știi",
    excerpt:
      "De la granturi pentru mobilitate individuală la proiecte de parteneriat — tot ce ai nevoie pentru a profita de cel mai mare program european de educație.",
    category: "Erasmus+",
    categoryColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    publishedAt: "2024-11-05",
    readingTime: 7,
    featured: false,
    tags: ["erasmus", "educatie", "burse"],
  },
];

function ArticleCard({
  article,
  index,
  featured = false,
}: {
  article: (typeof DEMO_ARTICLES)[0];
  index: number;
  featured?: boolean;
}) {
  return (
    <motion.article
      variants={fadeUpVariant}
      custom={index * 0.1}
      className={`group relative overflow-hidden rounded-2xl glass border border-white/5 hover:border-emerald-500/20 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-500/10 ${featured ? "md:col-span-2 md:row-span-2" : ""}`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${featured ? "h-64 md:h-80" : "h-48"}`}>
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-jef-dark/90 via-jef-dark/20 to-transparent" />

        {/* Category badge */}
        <span
          className={`absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${article.categoryColor}`}
        >
          <Tag size={10} />
          {article.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-3 text-white/30 text-xs mb-3">
          <span>{formatDate(article.publishedAt)}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock size={10} />
            {article.readingTime} min citire
          </span>
        </div>

        <h3
          className={`font-display font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug mb-3 ${featured ? "text-2xl md:text-3xl" : "text-lg"}`}
        >
          {article.title}
        </h3>

        <p className="text-white/50 text-sm leading-relaxed line-clamp-2 mb-5">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {article.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs text-white/25 px-2 py-0.5 rounded-full border border-white/10"
              >
                #{tag}
              </span>
            ))}
          </div>
          <Link
            href={`/stiri/${article.slug}`}
            className="inline-flex items-center gap-1.5 text-emerald-400 text-sm font-medium group-hover:gap-2.5 transition-all"
          >
            Citește
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export function FeaturedNewsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <motion.span
              variants={fadeUpVariant}
              custom={0}
              className="font-mono text-xs text-emerald-400 tracking-widest uppercase mb-4 block"
            >
              ── Ultimele știri
            </motion.span>
            <motion.h2
              variants={fadeUpVariant}
              custom={0.1}
              className="font-display text-4xl md:text-6xl font-bold text-white"
            >
              Ce se întâmplă{" "}
              <span className="gradient-text">acum</span>
            </motion.h2>
          </div>
          <motion.div variants={fadeUpVariant} custom={0.2}>
            <Link
              href="/stiri"
              className="group inline-flex items-center gap-2 text-white/50 hover:text-emerald-400 transition-colors font-medium"
            >
              Toate știrile
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainerVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto"
        >
          {DEMO_ARTICLES.map((article, i) => (
            <ArticleCard
              key={article.id}
              article={article}
              index={i}
              featured={article.featured}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}