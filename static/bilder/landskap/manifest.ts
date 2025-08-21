// src/routes/bilder/landskap/manifest.ts
import type { MediaManifest } from "$lib/types/media";
const base = "/bilder/landskap/";
export default {
  category: "Landskap",
  items: [{ src: base + "miday1.jpg" }, { src: base + "graycoast.jpg" }],
} satisfies MediaManifest;
