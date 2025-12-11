import { z } from "zod";
import { ClientSchema, VideoEntrySchema, TestimonialSchema, type Client, type VideoEntry, type Testimonial } from "./schemas";

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
    // important for SSG/ISR; let Next control caching later via fetch options
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`Failed GET ${path}: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    // Surface the first error for debugging
    throw new Error(`Schema validation failed for ${path}: ${parsed.error.issues[0]?.message}`);
  }
  return parsed.data;
}

// Public API for pages/components
export async function fetchClients(): Promise<Client[]> {
  return get("/api/clients", z.array(ClientSchema));
}

export async function fetchVideos(): Promise<VideoEntry[]> {
  return get("/api/videos", z.array(VideoEntrySchema));
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  return get("/api/testimonials", z.array(TestimonialSchema));
}
