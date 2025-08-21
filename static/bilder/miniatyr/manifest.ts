// src/routes/bilder/miniatyr/manifest.ts
import type { MediaManifest } from "$lib/types/media";
const base = "/bilder/miniatyr/";
export default {
  category: "Miniatyr",
  items: [{ src: base + "wingeddefender.jpg" }, { src: base + "mappoint.jpg" }],
} satisfies MediaManifest;
