// src/routes/bilder/kunst/manifest.ts
import type { MediaManifest } from "$lib/types/media";
const base = "/bilder/kunst/";
export default {
  category: "Kunst",
  items: [
    { src: base + "coloredgateway1.jpg" },
    { src: base + "digitalflowers1.jpg" },
  ],
} satisfies MediaManifest;
