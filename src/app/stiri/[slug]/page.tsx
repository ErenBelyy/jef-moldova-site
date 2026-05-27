import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Tag, Share2, ArrowUpRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";

// In production this would come from Sanity CMS
const ARTICLES: Record<string, {
  title: string; excerpt: string; body: string[];
  category: string; image: string; publishedAt: string;
  readingTime: number; tags: string[];
  author: { name: string; role: string; image: string };
  related: { slug: string; title: string; image: string; category: string }[];
}> = {
  "jef-moldova-conferinta-europeana-2024": {
    title: "JEF Moldova organizează Conferința Europeană a Tineretului 2024",
    excerpt: "Peste 200 de tineri din 15 țări se vor reuni la Chișinău pentru a dezbate viitorul Europei extinse.",
    body: [
      "JEF Moldova, în parteneriat cu Delegația Uniunii Europene în Republica Moldova, anunță organizarea celei mai mari conferințe europene a tineretului din istoria organizației. Evenimentul va reuni peste 200 de tineri din 15 țări europene, în perioada 15-17 decembrie 2024, la Chișinău.",
      "Sub tema „Extinderea UE și Viitorul Democrației Europene”, participanții vor dezbate în grupuri de lucru tematice subiecte precum: rolul tineretului în procesele de aderare, reforma instituțională a UE, combaterea dezinformării și construirea rezilienței democratice.",
      "„Această conferință este mai mult decât un eveniment — este un simbol al angajamentului nostru față de valorile europene și al credinței că tinerii Moldovei au un loc legitim la masa deciziilor europene,” a declarat Andrei Popescu, președintele JEF Moldova.",
      "Programul include keynote speakeri din Parlamentul European, ateliere interactive de advocacy, sesiuni de simulare a proceselor decizionale europene (Model European Parliament) și o gală de premiere a proiectelor de tineret cu impact european.",

      "Înregistrările sunt deschise pe site-ul oficial. Participarea este gratuită pentru membrii JEF Moldova, cu prioritate pentru tinerii între 18 și 30 de ani. Locurile sunt limitate — aplică până pe 1 decembrie.",
    ],
    category: "Evenimente",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80",
    publishedAt: "2024-11-15",
    readingTime: 4,
    tags: ["conferință", "tineret", "europa", "chisinau"],
    author: { name: "Maria Ionescu", role: "Coordonator Comunicare JEF Moldova", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop" },
    related: [
      { slug: "training-leadership-chisinau", title: "Training de Leadership pentru Tineri", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80", category: "Training" },
      { slug: "dezbatere-viitorul-europei-chisinau", title: "Dezbatere publică: Viitorul Europei", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&q=80", category: "Evenimente" },
    ],
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) return { title: "Articol negăsit" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { images: [article.image] },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) notFound();

  return (
    <div className="min-h-screen bg-jef-dark">
      {/* Hero image */}
      <div className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-jef-dark via-jef-dark/50 to-jef-dark/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 max-w-4xl pb-12">
            <Link href="/stiri" className="inline-flex items-center gap-2 text-white/50 hover:text-emerald-400 text-sm mb-6 transition-colors group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Înapoi la Știri
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass border border-purple-500/20 text-purple-400 text-xs font-medium">
                <Tag size={10} />{article.category}
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight">
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article content */}
      <div className="container mx-auto px-6 max-w-4xl py-16">
        {/* Meta */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/5 mb-10">
          <div className="flex items-center gap-4">
            <img src={article.author.image} alt={article.author.name} className="w-11 h-11 rounded-full object-cover border border-white/10" />
            <div>
              <p className="text-white font-medium text-sm">{article.author.name}</p>
              <p className="text-white/40 text-xs">{article.author.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 text-white/30 text-sm">
            <span className="flex items-center gap-1.5"><Calendar size={13} />{formatDate(article.publishedAt)}</span>
            <span className="flex items-center gap-1.5"><Clock size={13} />{article.readingTime} min citire</span>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-6 mb-12">
          {article.body.map((para, i) => (
            <p key={i} className={`leading-[1.85] text-white/70 ${i === 0 ? "text-xl font-light" : "text-base"}`}>
              {para}
            </p>
          ))}
        </div>

        {/* Tags */}
        <div className="flex items-center gap-3 flex-wrap pb-10 border-b border-white/5">
          <span className="text-white/30 text-sm">Etichete:</span>
          {article.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full glass border border-white/10 text-white/40 text-xs hover:text-white hover:border-emerald-500/30 transition-all cursor-pointer">
              #{tag}
            </span>
          ))}
        </div>

        {/* Share */}
        <div className="py-8 border-b border-white/5 flex items-center gap-4">
          <span className="text-white/30 text-sm">Distribuie:</span>
          {["Twitter", "Facebook", "LinkedIn"].map((s) => (
            <button key={s} className="px-4 py-2 rounded-xl glass border border-white/10 text-white/40 hover:text-white hover:border-emerald-500/30 text-xs transition-all">
              {s}
            </button>
          ))}
        </div>

        {/* Related */}
        {article.related.length > 0 && (
          <div className="pt-12">
            <h3 className="font-display text-2xl font-bold text-white mb-8">Articole înrudite</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {article.related.map((rel) => (
                <Link key={rel.slug} href={`/stiri/${rel.slug}`} className="group flex gap-4 p-4 rounded-2xl glass border border-white/5 hover:border-emerald-500/20 transition-all duration-300">
                  <img src={rel.image} alt={rel.title} className="w-20 h-16 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform duration-500" />
                  <div className="min-w-0">
                    <span className="text-emerald-400 text-xs mb-1 block">{rel.category}</span>
                    <p className="text-white/70 text-sm font-medium leading-snug group-hover:text-white transition-colors line-clamp-2">{rel.title}</p>
                  </div>
                  <ArrowUpRight size={14} className="text-emerald-400/0 group-hover:text-emerald-400 flex-shrink-0 mt-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}