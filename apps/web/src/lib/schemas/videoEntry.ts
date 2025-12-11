import { z } from "zod";

export type VideoEntry = {
  id: number;
  title: string;
  platform: "youtube" | "tiktok" | "instagram" | "facebook";
  embedUrl?: string;
  niche?: "gaming" | "motion_graphics" | "education" | "entertainment" | "other";
};

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

export function normalizeVideoEntry(entry: z.infer<typeof StrapiVideoEntrySchema>): VideoEntry {
  return {
    id: entry.id,
    title: entry.title,
    platform: entry.platform,
    embedUrl: entry.embedUrl,
    niche: entry.niche,
  };
}
