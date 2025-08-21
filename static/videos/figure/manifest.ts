import type { VideoManifest } from "$lib/types/video";

const base = "/video/figure/";

export default {
  category: "Figure",
  items: [
    { src: base + "rpgfantasy1.mp4", loop: true, muted: true },
    { src: base + "eatingflowers1.mp4", loop: true, muted: true },
  ],
} satisfies VideoManifest;
