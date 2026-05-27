"use client";

import Link from "next/link";
import { ArrowUpRight, Twitter, Instagram, Linkedin, Youtube, Mail, MapPin } from "lucide-react";

const footerLinks = {
  navigare: [
    { label: "Acasă", href: "/" },
    { label: "Știri", href: "/stiri" },
    { label: "Oportunități", href: "/oportunitati" },
    { label: "Contact", href: "/contact" },
  ],
  oportunități: [
    { label: "Stagii de practică", href: "/oportunitati#stagii" },
    { label: "Voluntariat", href: "/oportunitati#voluntariat" },
    { label: "Proiecte Erasmus+", href: "/oportunitati#erasmus" },
    { label: "Traininguri", href: "/oportunitati#training" },
  ],
  organizație: [
    { label: "Despre JEF Moldova", href: "/#despre" },
    { label: "Echipa noastră", href: "/#echipa" },
    { label: "Parteneri", href: "/#parteneri" },
    { label: "Politica de confidențialitate", href: "/confidentialitate" },
  ],
};

const socials = [
  { icon: Twitter, href: "https://twitter.com/jefmoldova", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/jefmoldova", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/jef-moldova", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/@jefmoldova", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-jef-dark to-jef-darkGreen" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-emerald-500/10 blur-[100px] rounded-full" />

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        {/* Top CTA */}
        <div className="py-20 border-b border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">
                <span className="gradient-text">Alătură-te</span>{" "}
                <span className="text-white">comunității</span>
              </h2>
              <p className="text-white/50 text-lg max-w-md">
                Fii parte din rețeaua de tineri care modelează viitorul european al Moldovei.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 text-black font-bold text-base hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
              >
                Devino Membru
                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
              <Link
                href="/stiri"
                className="flex items-center gap-2 px-8 py-4 rounded-xl glass border border-white/10 text-white/80 hover:text-white font-medium text-base transition-all duration-300 hover:border-emerald-500/30"
              >
                Explorează Știri
              </Link>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center">
                <span className="font-display font-bold text-sm text-black">JEF</span>
              </div>
              <span className="font-display font-bold text-xl text-white">JEF Moldova</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Tineri Federaliști Europeni — construim o Europă unită prin participare democratică și implicare civică.
            </p>
            <div className="space-y-3">
              <a href="mailto:contact@jef.md" className="flex items-center gap-2 text-white/40 hover:text-emerald-400 text-sm transition-colors group">
                <Mail size={14} />
                <span className="link-underline">contact@jef.md</span>
              </a>
              <span className="flex items-center gap-2 text-white/40 text-sm">
                <MapPin size={14} />
                Chișinău, Moldova
              </span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([key, links]) => (
            <div key={key}>
              <h4 className="font-display font-semibold text-white/90 text-sm uppercase tracking-widest mb-5">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/40 hover:text-white text-sm transition-colors link-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-sm">
            © {new Date().getFullYear()} JEF Moldova. Toate drepturile rezervate.
          </p>
          <div className="flex items-center gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-9 h-9 rounded-lg glass flex items-center justify-center text-white/30 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-300"
              >
                <social.icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}