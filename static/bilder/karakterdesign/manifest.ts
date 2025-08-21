// src/routes/bilder/karakterdesign/manifest.ts
import type { MediaManifest } from "$lib/types/media";
const base = "/bilder/karakterdesign/";
export default {
  category: "Karakterdesign",
  items: [{ src: base + "birdgirl1.jpg" }, { src: base + "guru1.jpg" }],
} satisfies MediaManifest;
