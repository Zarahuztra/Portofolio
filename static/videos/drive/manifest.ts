import type { VideoManifest } from "$lib/types/video";

const base = "/video/drive/";

export default {
  category: "Drive",
  items: [
    { src: base + "trainwatching1.mp4", loop: true, muted: true },
    { src: base + "jeddah1.mp4", loop: true, muted: true },
  ],
} satisfies VideoManifest;
