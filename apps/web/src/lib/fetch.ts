import { z } from "zod";
import {
  Client,
  VideoEntry,
  Testimonial,
  StrapiClientSchema,
  StrapiVideoEntrySchema,
  StrapiTestimonialSchema,
  StrapiResponseSchema,
} from "./schemas";
import { normalizeClient } from "./schemas/client";
import { normalizeVideoEntry } from "./schemas/videoEntry";
import { normalizeTestimonial } from "./schemas/testimonial";

const STRAPI_URL = process.env.STRAPI_URL!;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN!;

function apiHeaders() {
  return {
    Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    "Content-Type": "application/json",
  };
}

async function get<T>(path: string, schema: z.ZodType<T>): Promise<T> {
  const res = await fetch(`${STRAPI_URL}${path}`, {
    headers: apiHeaders(),
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`Failed GET ${path}: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    throw new Error(
      `Schema validation failed for ${path}: ${first?.message ?? parsed.error.message}`
    );
  }
  return parsed.data;
}

/**
 * Generic collection fetcher
 */
async function fetchCollection<T extends { data: Raw[] }, Raw, U>(
  path: string,
  schema: z.ZodType<T>,
  normalize: (raw: Raw) => U
): Promise<U[]> {
  const raw = await get(path, schema);
  return raw.data.map(normalize);
}


// Normalized API

export async function fetchClients(): Promise<Client[]> {
  return fetchCollection(
    "/api/clients?populate=*",
    StrapiResponseSchema(StrapiClientSchema),
    normalizeClient
  );
}

export async function fetchVideos(): Promise<VideoEntry[]> {
  return fetchCollection(
    "/api/video-entries?populate=*",
    StrapiResponseSchema(StrapiVideoEntrySchema),
    normalizeVideoEntry
  );
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  return fetchCollection(
    "/api/testimonials?populate=*",
    StrapiResponseSchema(StrapiTestimonialSchema),
    normalizeTestimonial
  );
}
