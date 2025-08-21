import type { VideoManifest } from "$lib/types/video";

const base = "/video/other/";

export default {
  category: "Other",
  items: [
    { src: base + "butterflyface1.mp4", loop: true, muted: true },
    { src: base + "morphtextdream.mp4", loop: true, muted: true },
  ],
} satisfies VideoManifest;
