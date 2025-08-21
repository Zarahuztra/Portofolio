import type { VideoManifest } from "$lib/types/video";

const base = "/video/food/";

export default {
  category: "Food",
  items: [
    { src: base + "colaicecream1.mp4", loop: true, muted: true },
    { src: base + "shrimps.mp4", loop: true, muted: true },
  ],
} satisfies VideoManifest;
