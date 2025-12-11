// src/lib/fetch.ts
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

// helpers

function blocksToText(b: unknown): string {
  if (Array.isArray(b)) {
    return b
      .map((node) => {
        if (node && typeof node === "object") {
          const maybeNode = node as { text?: string; children?: { text?: string }[] };
          const text =
            maybeNode.text ??
            (Array.isArray(maybeNode.children)
              ? maybeNode.children.map((c) => c.text ?? "").filter(Boolean).join(" ")
              : "");
          return text || "";
        }
        return "";
      })
      .filter(Boolean)
      .join("\n")
      .trim();
  }
  return typeof b === "string" ? b : "";
}


// Normalized API

export async function fetchClients(): Promise<Client[]> {
  const raw = await get(
    "/api/clients?populate=*",
    StrapiResponseSchema(StrapiClientSchema)
  );

  return raw.data.map((entry) => ({
    id: entry.id,
    name: entry.Name,
    socialUrl: entry.socialUrl,
    avatarUrl: entry.avatar?.url,
    videos:
      entry.video_entries?.map((v) => ({
        id: v.id,
        title: v.title,
        platform: v.platform,
        embedUrl: v.embedUrl,
        niche: v.niche,
      })) ?? [],
  }));
}

export async function fetchVideos(): Promise<VideoEntry[]> {
  const raw = await get(
    "/api/video-entries?populate=*",
    StrapiResponseSchema(StrapiVideoEntrySchema)
  );
  return raw.data.map((entry) => ({
    id: entry.id,
    title: entry.title,
    platform: entry.platform,
    embedUrl: entry.embedUrl,
    niche: entry.niche,
  }));
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const raw = await get(
    "/api/testimonials?populate=*",
    StrapiResponseSchema(StrapiTestimonialSchema)
  );

  return raw.data.map((t) => ({
    id: t.id,
    clientName: t.clientName,
    role: t.role ?? undefined,
    quote: blocksToText(t.quote),
    avatarUrls: (t.avatar ?? []).map((m) => m.url),
  }));
}

