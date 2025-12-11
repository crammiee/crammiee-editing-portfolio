import { z } from "zod";

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
  formats: z.record(z.string(), StrapiFormatSchema).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  publishedAt: z.string().optional(),
});

/**
 * Generic Strapi response wrapper
 */
export const StrapiResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    meta: z.any(),
  });
