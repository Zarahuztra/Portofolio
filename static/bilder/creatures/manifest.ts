// src/routes/bilder/creatures/manifest.ts
import type { MediaManifest } from "$lib/types/media";
const base = "/bilder/creatures/";
export default {
  category: "Creatures",
  items: [{ src: base + "dropcrea1.jpg" }, { src: base + "joyful.jpg" }],
} satisfies MediaManifest;
