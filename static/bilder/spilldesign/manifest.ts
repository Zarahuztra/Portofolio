// src/routes/bilder/spilldesign/manifest.ts
import type { MediaManifest } from "$lib/types/media";
const base = "/bilder/spilldesign/";
export default {
  category: "Spilldesign",
  items: [{ src: base + "skywars1.jpg" }, { src: base + "cubiverse.jpg" }],
} satisfies MediaManifest;
