import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "JEF Moldova — Tineri Federaliști Europeni",
    template: "%s | JEF Moldova",
  },
  description:
    "JEF Moldova conectează tinerii cu valorile și oportunitățile europene. Descoperă știri, oportunități și evenimente pentru tineri implicați civic.",
  keywords: [
    "JEF Moldova",
    "Tineri Federaliști Europeni",
    "oportunități europene",
    "voluntariat",
    "Erasmus",
    "tineret Moldova",
    "implicare civică",
  ],
  authors: [{ name: "JEF Moldova" }],
  creator: "JEF Moldova",
  openGraph: {
    type: "website",
    locale: "ro_MD",
    url: "https://jef.md",
    siteName: "JEF Moldova",
    title: "JEF Moldova — Tineri Federaliști Europeni",
    description:
      "Conectăm tinerii moldoveni cu valorile și oportunitățile europene.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "JEF Moldova",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JEF Moldova",
    description: "Tineri Federaliști Europeni din Moldova",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ro"
      suppressHydrationWarning
      className={`${syne.variable} ${dmSans.variable} ${jetBrainsMono.variable}`}
    >
      <body className="bg-jef-dark text-white antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SmoothScroll>
            <CustomCursor />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
