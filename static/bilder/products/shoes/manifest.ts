// src/routes/bilder/products/shoes/manifest.ts
import type { MediaManifest } from "$lib/types/media";
const base = "/bilder/products/shoes/";
export default {
  category: "Products – Shoes",
  items: [{ src: base + "golfsneaker.jpg" }, { src: base + "bysneaker.jpg" }],
} satisfies MediaManifest;
