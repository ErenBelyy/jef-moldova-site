import { sanityClient } from "./sanity.client";
import type { NewsArticle, Opportunity, Event } from "@/types/custom";

// ─── News ─────────────────────────────────────────────────────────────────────

export async function getAllNews(limit = 20): Promise<NewsArticle[]> {
  return sanityClient.fetch(
    `*[_type == "news"] | order(publishedAt desc) [0...$limit] {
      _id, _type, title,
      slug, excerpt, mainImage, publishedAt, featured, readingTime,
      "author": author->{ _id, name, image, role },
      "categories": categories[]->{ _id, title, slug, color },
      tags
    }`,
    { limit }
  );
}

export async function getFeaturedNews(limit = 4): Promise<NewsArticle[]> {
  return sanityClient.fetch(
    `*[_type == "news" && featured == true] | order(publishedAt desc) [0...$limit] {
      _id, _type, title, slug, excerpt, mainImage, publishedAt, readingTime,
      "categories": categories[]->{ _id, title, slug, color },
      tags
    }`,
    { limit }
  );
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  return sanityClient.fetch(
    `*[_type == "news" && slug.current == $slug][0] {
      _id, _type, title, slug, excerpt, body, mainImage, publishedAt, readingTime,
      "author": author->{ _id, name, image, role, bio, socialLinks },
      "categories": categories[]->{ _id, title, slug, color },
      tags
    }`,
    { slug }
  );
}

// ─── Opportunities ────────────────────────────────────────────────────────────

export async function getAllOpportunities(limit = 30): Promise<Opportunity[]> {
  return sanityClient.fetch(
    `*[_type == "opportunity"] | order(deadline asc) [0...$limit] {
      _id, _type, title, slug, description, image, type,
      organization, location, country, deadline, startDate, duration,
      stipend, stipendAmount, applicationUrl, tags, featured
    }`,
    { limit }
  );
}

export async function getFeaturedOpportunities(limit = 6): Promise<Opportunity[]> {
  return sanityClient.fetch(
    `*[_type == "opportunity" && featured == true] | order(deadline asc) [0...$limit] {
      _id, _type, title, slug, description, image, type,
      organization, location, country, deadline, duration,
      stipend, stipendAmount, applicationUrl, tags
    }`,
    { limit }
  );
}

export async function getOpportunityBySlug(slug: string): Promise<Opportunity | null> {
  return sanityClient.fetch(
    `*[_type == "opportunity" && slug.current == $slug][0] {
      _id, _type, title, slug, description, body, image, type,
      organization, location, country, deadline, startDate, duration,
      stipend, stipendAmount, applicationUrl, requirements, benefits, tags
    }`,
    { slug }
  );
}

// ─── Events ───────────────────────────────────────────────────────────────────

export async function getUpcomingEvents(limit = 6): Promise<Event[]> {
  const now = new Date().toISOString();
  return sanityClient.fetch(
    `*[_type == "event" && startDate >= $now] | order(startDate asc) [0...$limit] {
      _id, _type, title, slug, description, image,
      startDate, endDate, location, online, registrationUrl, tags, featured
    }`,
    { now, limit }
  );
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  return sanityClient.fetch(
    `*[_type == "event" && slug.current == $slug][0] {
      _id, _type, title, slug, description, body, image,
      startDate, endDate, location, online, registrationUrl, capacity, tags
    }`,
    { slug }
  );
}