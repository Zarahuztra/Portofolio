// src/routes/bilder/tekstur/manifest.ts
import type { MediaManifest } from "$lib/types/media";
const base = "/bilder/tekstur/";
export default {
  category: "Tekstur",
  items: [{ src: base + "woodtexture1.jpg" }, { src: base + "vanillaice.jpg" }],
} satisfies MediaManifest;
