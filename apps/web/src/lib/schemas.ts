// src/lib/schemas.ts
import { z } from "zod";

/**
 * Canonical frontend types — flat, normalized objects your UI consumes.
 */
export type Client = {
  id: number;
  name: string;
  socialUrl: string;
  avatarUrl?: string;
  videos: VideoEntry[];
};

export type VideoEntry = {
  id: number;
  title: string;
  platform: "youtube" | "tiktok" | "instagram" | "facebook";
  embedUrl?: string;
  niche?: "gaming" | "motion_graphics" | "education" | "entertainment" | "other";
};

export type Testimonial = {
  id: number;
  clientName: string;
  role?: string;
  quote: string;
  avatarUrls: string[];
};

/**
 * Strapi response schemas — match your actual (flattened) JSON.
 * No "attributes" nesting; fields are flat on each item.
 */

export const StrapiVideoEntrySchema = z.object({
  id: z.number(),
  documentId: z.string(),
  title: z.string(),
  platform: z.enum(["youtube", "tiktok", "instagram", "facebook"]),
  embedUrl: z.string().url().optional(),
  niche: z
    .enum(["gaming", "motion_graphics", "education", "entertainment", "other"])
    .optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
});

export const StrapiFormatSchema = z.object({
  name: z.string(),
  hash: z.string(),
  ext: z.string(),
  mime: z.string(),
  path: z.string().nullable().optional(),
  width: z.number(),
  height: z.number(),
  size: z.number(),
  sizeInBytes: z.number().optional(),
  url: z.string(),
});

export const StrapiAvatarSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  name: z.string(),
  alternativeText: z.string().nullable().optional(),
  caption: z.string().nullable().optional(),
  width: z.number(),
  height: z.number(),
  url: z.string(),
  previewUrl: z.string().nullable().optional(),
  provider: z.string().optional(),
  provider_metadata: z.any().nullable().optional(),
  hash: z.string().optional(),
  ext: z.string().optional(),
  mime: z.string().optional(),
  size: z.number().optional(),
  formats: z
    .record(z.string(), StrapiFormatSchema)
    .optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  publishedAt: z.string().optional(),
});

export const StrapiClientSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  Name: z.string(),
  socialUrl: z.string().url(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  avatar: StrapiAvatarSchema.optional(),
  video_entries: z.array(StrapiVideoEntrySchema).optional(),
});

export const StrapiTestimonialSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  clientName: z.string(),
  role: z.string().nullable().optional(),
  quote: z.array(
    z.object({
      type: z.string(),
      children: z.array(
        z.object({
          type: z.string(),
          text: z.string(),
        })
      ),
    })
  ),
  avatar: z.array(StrapiAvatarSchema).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  publishedAt: z.string().optional(),
});


/**
 * Generic Strapi response wrapper.
 */
export const StrapiResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    meta: z.any(),
  });
