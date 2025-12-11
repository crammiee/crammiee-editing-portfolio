import { z } from "zod";

/**
 * Canonical frontend types mirroring Strapi payloads we expose.
 * Keep these lean and aligned to published fields only.
 */

export const ClientSchema = z.object({
  id: z.number(),
  name: z.string(),
  avatarUrl: z.string().url().optional(),
  socialUrl: z.string().url().optional(),
});

export type Client = z.infer<typeof ClientSchema>;

export const VideoEntrySchema = z.object({
  id: z.number(),
  title: z.string(),
  platform: z.enum(["youtube", "tiktok", "instagram", "facebook"]),
  embedUrl: z.string().url(),
  niche: z.enum(["gaming", "motion_graphics", "education", "entertainment", "other"]),
  clientId: z.number().optional(),
});

export type VideoEntry = z.infer<typeof VideoEntrySchema>;

export const TestimonialSchema = z.object({
  id: z.number(),
  clientName: z.string(),
  role: z.string().optional(),
  quote: z.string(),
});

export type Testimonial = z.infer<typeof TestimonialSchema>;
