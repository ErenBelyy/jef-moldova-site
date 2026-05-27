import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow, parseISO, differenceInMinutes } from "date-fns";
import { ro } from "date-fns/locale";

// ─── Tailwind class merging ───────────────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Date formatting ──────────────────────────────────────────────────────────
export function formatDate(dateString: string, pattern = "d MMMM yyyy"): string {
  try {
    return format(parseISO(dateString), pattern, { locale: ro });
  } catch {
    return dateString;
  }
}

export function formatRelativeDate(dateString: string): string {
  try {
    return formatDistanceToNow(parseISO(dateString), {
      addSuffix: true,
      locale: ro,
    });
  } catch {
    return dateString;
  }
}

export function isNew(dateString: string, withinMinutes = 10080): boolean {
  try {
    return Math.abs(differenceInMinutes(new Date(), parseISO(dateString))) < withinMinutes;
  } catch {
    return false;
  }
}

// ─── Reading time ─────────────────────────────────────────────────────────────
export function estimateReadingTime(text: string): number {
  const wpm = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wpm));
}

// ─── Truncate text ────────────────────────────────────────────────────────────
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + "…";
}

// ─── Slug helpers ─────────────────────────────────────────────────────────────
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ─── Opportunity type labels ──────────────────────────────────────────────────
export const opportunityTypeLabels: Record<string, string> = {
  internship: "Stagiu de practică",
  volunteering: "Voluntariat",
  erasmus: "Erasmus+",
  training: "Training",
  project: "Proiect",
  conference: "Conferință",
};

export const opportunityTypeColors: Record<string, string> = {
  internship: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  volunteering: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  erasmus: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  training: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  project: "bg-orange-500/15 text-orange-400 border-orange-500/20",
  conference: "bg-pink-500/15 text-pink-400 border-pink-500/20",
};

// ─── Number formatting ────────────────────────────────────────────────────────
export function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

// ─── Array chunking ───────────────────────────────────────────────────────────
export function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
}

// ─── Debounce ─────────────────────────────────────────────────────────────────
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ─── Random between ───────────────────────────────────────────────────────────
export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// ─── Sanity image URL builder ─────────────────────────────────────────────────
export function getSanityImageUrl(
  image: { asset: { _ref: string } },
  projectId: string,
  dataset: string
): string {
  const ref = image.asset._ref;
  const [, id, dimensions, ext] = ref.split("-");
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${ext}`;
}

// ─── URL helpers ──────────────────────────────────────────────────────────────
export function absoluteUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jef.md";
  return `${base}${path}`;
}

// ─── Framer Motion shared variants ───────────────────────────────────────────
export const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const fadeInVariant = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay, ease: "easeOut" },
  }),
};

export const staggerContainerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const scaleInVariant = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay, ease: [0.34, 1.56, 0.64, 1] },
  }),
};

export const slideRightVariant = {
  hidden: { opacity: 0, x: -40 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};