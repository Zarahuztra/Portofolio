// src/routes/bilder/products/devices/manifest.ts
import type { MediaManifest } from "$lib/types/media";
const base = "/bilder/products/devices/";
export default {
  category: "Products – Devices",
  items: [{ src: base + "device1.jpg" }, { src: base + "musicplayer1.jpg" }],
} satisfies MediaManifest;
