// src/routes/bilder/webdesign/assets/manifest.ts
import type { MediaManifest } from "$lib/types/media";
const base = "/bilder/webdesign/assets/";
export default {
  category: "Webdesign – Assets",
  items: [{ src: base + "waves1.jpg" }, { src: base + "arrows3.jpg" }],
} satisfies MediaManifest;
