// src/routes/bilder/logo/manifest.ts
import type { MediaManifest } from "$lib/types/media";
const base = "/bilder/logo/";
export default {
  category: "Logo",
  items: [{ src: base + "arka2.jpg" }, { src: base + "dzf1.jpg" }],
} satisfies MediaManifest;
