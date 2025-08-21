import type { VideoManifest } from "$lib/types/video";

const base = "/video/nature/";

export default {
  category: "Nature",
  items: [
    { src: base + "treeflight1.mp4", loop: true, muted: true },
    { src: base + "beachday.mp4", loop: true, muted: true },
  ],
} satisfies VideoManifest;
