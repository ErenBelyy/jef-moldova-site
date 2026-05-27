import type { Metadata } from "next";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedNewsSection } from "@/components/FeaturedNewsSection";
import { AboutSection } from "@/components/AboutSection";
import { PartnersSection } from "@/components/PartnersSection";
import { JoinSection } from "@/components/JoinSection";

export const metadata: Metadata = {
  title: "JEF Moldova — Tineri Federaliști Europeni",
  description:
    "JEF Moldova conectează tinerii cu valorile și oportunitățile europene.",
};

export default function HomePage() {
  return (
    <main className="bg-black text-white overflow-hidden">
      <HeroSection />

      {/* TEMP CONTENT */}
      <section className="relative z-10 px-6 py-24 max-w-6xl mx-auto">
        <div className="rounded-3xl border border-green-500/20 bg-white/5 backdrop-blur-xl p-10">
          <h2 className="text-5xl font-bold text-green-400 mb-6">
            Viitorul începe aici
          </h2>

          <p className="text-zinc-300 text-xl leading-relaxed mb-6">
            JEF Moldova creează oportunități pentru tinerii care vor să
            participe activ la dezvoltarea europeană a Republicii Moldova.
          </p>

          <p className="text-zinc-400 leading-relaxed">
            Descoperă proiecte internaționale, traininguri, mobilități Erasmus+,
            evenimente și inițiative dedicate noii generații europene.
          </p>

          <div className="flex gap-4 mt-10">
            <button className="px-6 py-3 rounded-2xl bg-green-500 hover:bg-green-400 transition-all">
              Explorează Știri
            </button>

            <button className="px-6 py-3 rounded-2xl border border-green-500/40 hover:bg-green-500/10 transition-all">
              Vezi Oportunități
            </button>
          </div>
        </div>
      </section>

      <FeaturedNewsSection />
      <AboutSection />
      <PartnersSection />
      <JoinSection />
    </main>
  );
}