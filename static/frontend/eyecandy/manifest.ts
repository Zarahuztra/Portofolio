import type { MediaManifest } from "$lib/types/media";

const base = "/frontend/eyecandy/bilder/"; // legg filene i static/frontend/eyecandy/bilder/

export default {
  category: "Frontend – Eyecandy",
  items: [
    { src: base + "wavingblocks.png", title: "Waving Blocks (visuell effekt)" },
    { src: base + "parall.png", title: "Parallaks (visuell effekt)" },
  ],
} satisfies MediaManifest;
