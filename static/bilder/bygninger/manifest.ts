// src/routes/bilder/bygninger/manifest.ts
import type { MediaManifest } from "$lib/types/media";
const base = "/bilder/bygninger/";
export default {
  category: "Bygninger",
  items: [{ src: base + "crazycity1.jpg" }, { src: base + "castle2.jpg" }],
} satisfies MediaManifest;
