// src/routes/bilder/underholdning/manifest.ts
import type { MediaManifest } from "$lib/types/media";
const base = "/bilder/underholdning/";
export default {
  category: "Underholdning",
  items: [{ src: base + "peaks1.jpg" }, { src: base + "floatingmarket.jpg" }],
} satisfies MediaManifest;
