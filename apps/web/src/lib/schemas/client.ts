import { z } from "zod";
import { StrapiAvatarSchema } from "./common";
import { StrapiVideoEntrySchema, VideoEntry } from "./videoEntry";


export type Client = {
  id: number;
  name: string;
  socialUrl: string;
  avatarUrl?: string;
  videos: VideoEntry[];
};

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

export function normalizeClient(entry: z.infer<typeof StrapiClientSchema>): Client {
  return {
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
  };
}