// src/lib/schemas/index.ts

export { StrapiAvatarSchema, StrapiResponseSchema } from "./common";

// ✅ use `export type` for types
export type { Client } from "./client";
export { StrapiClientSchema, normalizeClient } from "./client";

export type { VideoEntry } from "./videoEntry";
export { StrapiVideoEntrySchema, normalizeVideoEntry } from "./videoEntry";

export type { Testimonial } from "./testimonial";
export { StrapiTestimonialSchema, normalizeTestimonial } from "./testimonial";
