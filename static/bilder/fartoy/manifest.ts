// src/routes/bilder/fartoy/manifest.ts
import type { MediaManifest } from "$lib/types/media";
const base = "/bilder/fartoy/";
export default {
  category: "Fartøy",
  items: [
    { src: base + "musclecar1.jpg" },
    { src: base + "flightovercity.jpg" },
  ],
} satisfies MediaManifest;
