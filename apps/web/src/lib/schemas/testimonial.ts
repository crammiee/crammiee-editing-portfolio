import { z } from "zod";
import { StrapiAvatarSchema } from "./common";

export type Testimonial = {
  id: number;
  clientName: string;
  role?: string;
  quote: string;
  avatarUrls: string[];
};

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

function blocksToText(
  blocks: { type: string; children: { text: string }[] }[]
): string {
  return blocks
    .map((b) => b.children.map((c) => c.text).join(" "))
    .join("\n")
    .trim();
}

export function normalizeTestimonial(
  entry: z.infer<typeof StrapiTestimonialSchema>
): Testimonial {
  return {
    id: entry.id,
    clientName: entry.clientName,
    role: entry.role ?? undefined,
    quote: blocksToText(entry.quote),
    avatarUrls: (entry.avatar ?? []).map((m) => m.url),
  };
}
