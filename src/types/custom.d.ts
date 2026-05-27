import type { PortableTextBlock } from "@portabletext/types";
import type { Image as SanityImage } from "sanity";

// ─── Sanity document types ───────────────────────────────────────────────────

export interface SanitySlug {
  _type: "slug";
  current: string;
}

export interface SanityImageAsset {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
}

export interface Author {
  _id: string;
  _type: "author";
  name: string;
  slug: SanitySlug;
  image?: SanityImageAsset;
  bio?: string;
  role?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface Category {
  _id: string;
  _type: "category";
  title: string;
  slug: SanitySlug;
  color?: string;
  description?: string;
}

export interface NewsArticle {
  _id: string;
  _type: "news";
  title: string;
  slug: SanitySlug;
  excerpt: string;
  body: PortableTextBlock[];
  mainImage?: SanityImageAsset;
  author?: Author;
  categories?: Category[];
  tags?: string[];
  publishedAt: string;
  featured?: boolean;
  readingTime?: number;
}

export interface Opportunity {
  _id: string;
  _type: "opportunity";
  title: string;
  slug: SanitySlug;
  description: string;
  body?: PortableTextBlock[];
  image?: SanityImageAsset;
  type: "internship" | "volunteering" | "erasmus" | "training" | "project" | "conference";
  organization?: string;
  location?: string;
  country?: string;
  deadline?: string;
  startDate?: string;
  duration?: string;
  stipend?: boolean;
  stipendAmount?: string;
  applicationUrl?: string;
  requirements?: string[];
  benefits?: string[];
  tags?: string[];
  featured?: boolean;
}

export interface Event {
  _id: string;
  _type: "event";
  title: string;
  slug: SanitySlug;
  description: string;
  body?: PortableTextBlock[];
  image?: SanityImageAsset;
  startDate: string;
  endDate?: string;
  location?: string;
  online?: boolean;
  registrationUrl?: string;
  capacity?: number;
  tags?: string[];
  featured?: boolean;
}

// ─── UI types ────────────────────────────────────────────────────────────────

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export type StatItem = {
  value: string;
  label: string;
  suffix?: string;
};

export type PartnerItem = {
  name: string;
  logo: string;
  url?: string;
};

export type OpportunityType =
  | "internship"
  | "volunteering"
  | "erasmus"
  | "training"
  | "project"
  | "conference";

export type FilterOption = {
  label: string;
  value: string;
};

// ─── Animation variants ───────────────────────────────────────────────────────

export type AnimationVariant = "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scale" | "blur";

// ─── Form types ───────────────────────────────────────────────────────────────

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
}