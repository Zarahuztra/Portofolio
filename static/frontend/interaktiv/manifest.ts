import type { MediaManifest } from "$lib/types/media";

const base = "/frontend/interaktiv/bildeeks/"; // legg filene i static/frontend/interaktiv/bildeeks/

export default {
  category: "Frontend – Interaktiv",
  items: [
    { src: base + "voxel.png", title: "Voxel (interaktiv demo)" },
    { src: base + "perlinsmoke.png", title: "Perlin Smoke (interaktiv demo)" },
  ],
} satisfies MediaManifest;
