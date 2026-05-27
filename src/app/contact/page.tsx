"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle, ArrowUpRight, Twitter, Instagram, Linkedin, Youtube, Loader2 } from "lucide-react";
import { fadeUpVariant, staggerContainerVariant } from "@/lib/utils";

const SOCIAL_LINKS = [
  { icon: Twitter, label: "Twitter", handle: "@jefmoldova", href: "https://twitter.com/jefmoldova", color: "hover:text-sky-400 hover:border-sky-400/30" },
  { icon: Instagram, label: "Instagram", handle: "@jef.moldova", href: "https://instagram.com/jef.moldova", color: "hover:text-pink-400 hover:border-pink-400/30" },
  { icon: Linkedin, label: "LinkedIn", handle: "JEF Moldova", href: "https://linkedin.com/company/jef-moldova", color: "hover:text-blue-400 hover:border-blue-400/30" },
  { icon: Youtube, label: "YouTube", handle: "JEF Moldova", href: "https://youtube.com/@jefmoldova", color: "hover:text-red-400 hover:border-red-400/30" },
];

const FAQ = [
  { q: "Cine poate deveni membru JEF Moldova?", a: "Orice tânăr cu vârsta cuprinsă între 16 și 35 de ani, indiferent de cetățenie, care împărtășește valorile democratice și proiectul european." },
  { q: "Este obligatorie apartenența la un partid politic?", a: "Nu. JEF Moldova este o organizație apartidică. Acceptăm tineri cu convingeri politice diverse, uniți de valorile europene comune." },
  { q: "Cum mă pot implica fără a deveni membru?", a: "Poți participa la evenimentele noastre deschise, voluntaria în proiecte specifice sau urma programele de training fără a fi obligatorie calitatea de membru." },
  { q: "Există taxă de membru?", a: "Taxa anuală de membru este simbolică — 100 MDL/an — și acoperă parțial costurile operaționale ale organizației." },
];

export default function ContactPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const inView = useInView(formRef, { once: true, margin: "-100px" });
  const faqInView = useInView(faqRef, { once: true, margin: "-100px" });

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", consent: false });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 2000));
    setStatus("sent");
  };

  return (
    <div className="min-h-screen bg-jef-dark">
      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-900/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-mono text-xs text-emerald-400 tracking-widest uppercase mb-4 block">── Contactează-ne</span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Hai să{" "}
              <span className="gradient-text">vorbim</span>
            </h1>
            <p className="text-white/50 text-xl max-w-2xl">
              Ai întrebări, idei sau vrei să te implici? Suntem la un mesaj distanță.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main grid */}
      <section className="pb-24" ref={formRef}>
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Left — info */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={staggerContainerVariant}
              className="lg:col-span-2 space-y-8"
            >
              {/* Contact cards */}
              {[
                { icon: Mail, label: "Email", value: "contact@jef.md", href: "mailto:contact@jef.md" },
                { icon: MapPin, label: "Adresă", value: "str. Columna 106, Chișinău, Moldova", href: "#harta" },
                { icon: Phone, label: "Telefon", value: "+373 22 123 456", href: "tel:+37322123456" },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  variants={fadeUpVariant}
                  custom={i * 0.1}
                  className="flex items-start gap-5 p-6 rounded-2xl glass border border-white/5 hover:border-emerald-500/20 transition-all duration-300 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                    <item.icon size={18} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white/30 text-xs uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-white font-medium">{item.value}</p>
                  </div>
                  <ArrowUpRight size={14} className="text-emerald-400/0 group-hover:text-emerald-400 ml-auto flex-shrink-0 mt-1 transition-all" />
                </motion.a>
              ))}

              {/* Social */}
              <motion.div variants={fadeUpVariant} custom={0.3} className="p-6 rounded-2xl glass border border-white/5">
                <p className="text-white/30 text-xs uppercase tracking-widest mb-5">Rețele sociale</p>
                <div className="space-y-3">
                  {SOCIAL_LINKS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-4 p-3 rounded-xl border border-white/5 text-white/40 transition-all duration-300 ${s.color}`}
                    >
                      <s.icon size={16} />
                      <div>
                        <p className="text-xs font-medium leading-none mb-0.5">{s.label}</p>
                        <p className="text-xs opacity-60">{s.handle}</p>
                      </div>
                      <ArrowUpRight size={12} className="ml-auto" />
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Map placeholder */}
              <motion.div variants={fadeUpVariant} custom={0.4} id="harta" className="relative h-52 rounded-2xl overflow-hidden glass border border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 to-jef-darkGreen/50 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={32} className="text-emerald-400 mx-auto mb-2" />
                    <p className="text-white/50 text-sm">Chișinău, Moldova</p>
                    <p className="text-white/25 text-xs">str. Columna 106</p>
                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-emerald-400 text-xs hover:underline">
                      Deschide în Maps <ArrowUpRight size={10} />
                    </a>
                  </div>
                </div>
                <div className="absolute inset-0 grid-pattern opacity-20" />
              </motion.div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="p-8 md:p-10 rounded-3xl glass border border-white/8 gradient-border">
                <h2 className="font-display text-3xl font-bold text-white mb-2">Trimite-ne un mesaj</h2>
                <p className="text-white/40 text-sm mb-8">Răspundem în maxim 48 de ore lucrătoare.</p>

                <AnimatePresence mode="wait">
                  {status === "sent" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-16 text-center gap-5"
                    >
                      <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                        <CheckCircle size={36} className="text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl font-bold text-white mb-2">Mesaj trimis!</h3>
                        <p className="text-white/50">Mulțumim! Te vom contacta în curând.</p>
                      </div>
                      <button onClick={() => setStatus("idle")} className="text-emerald-400 text-sm hover:underline">
                        Trimite alt mesaj
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">Nume complet *</label>
                          <input
                            name="name" value={form.name} onChange={handleChange} required
                            placeholder="Ion Popescu"
                            className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-emerald-500/50 bg-transparent text-white placeholder-white/20 text-sm outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">Email *</label>
                          <input
                            name="email" type="email" value={form.email} onChange={handleChange} required
                            placeholder="ion@exemplu.md"
                            className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-emerald-500/50 bg-transparent text-white placeholder-white/20 text-sm outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">Subiect *</label>
                        <select
                          name="subject" value={form.subject} onChange={handleChange} required
                          className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-emerald-500/50 bg-jef-dark text-white/70 text-sm outline-none transition-colors"
                        >
                          <option value="">Selectează un subiect...</option>
                          <option>Devin membru JEF Moldova</option>
                          <option>Informații despre oportunități</option>
                          <option>Parteneriat / Colaborare</option>
                          <option>Presă / Media</option>
                          <option>Alt subiect</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">Mesaj *</label>
                        <textarea
                          name="message" value={form.message} onChange={handleChange} required rows={5}
                          placeholder="Scrie mesajul tău aici..."
                          className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-emerald-500/50 bg-transparent text-white placeholder-white/20 text-sm outline-none transition-colors resize-none"
                        />
                      </div>

                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative mt-0.5">
                          <input
                            type="checkbox" name="consent" checked={form.consent} onChange={handleChange} required
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-md border transition-all ${form.consent ? "bg-emerald-500 border-emerald-500" : "border-white/20 bg-transparent"} flex items-center justify-center`}>
                            {form.consent && <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                          </div>
                        </div>
                        <span className="text-white/40 text-sm leading-relaxed">
                          Sunt de acord cu prelucrarea datelor personale în conformitate cu{" "}
                          <a href="/confidentialitate" className="text-emerald-400 hover:underline">politica de confidențialitate</a>.
                        </span>
                      </label>

                      <button
                        type="submit"
                        disabled={status === "sending" || !form.consent}
                        className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 text-black font-bold text-base hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        {status === "sending" ? (
                          <><Loader2 size={18} className="animate-spin" /> Se trimite...</>
                        ) : (
                          <><Send size={18} /> Trimite mesajul</>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-24" ref={faqRef}>
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={faqInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-14">
            <span className="font-mono text-xs text-emerald-400 tracking-widest uppercase mb-4 block">── Întrebări frecvente</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              Tot ce vrei <span className="gradient-text">să știi</span>
            </h2>
          </motion.div>

          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={faqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="rounded-2xl glass border border-white/5 hover:border-emerald-500/15 transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-display font-semibold text-white text-base">{item.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.2 }} className="text-emerald-400 flex-shrink-0 ml-4">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-white/50 leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}