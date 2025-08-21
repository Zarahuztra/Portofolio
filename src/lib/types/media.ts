// src/lib/types/media.ts
export type MediaItem = { src: string; title?: string; poster?: string };
export type MediaManifest = { category: string; items: MediaItem[] };
