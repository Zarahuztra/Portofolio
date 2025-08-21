import type { VideoManifest } from "$lib/types/video";

const base = "/video/face/";

export default {
  category: "Face",
  items: [
    { src: base + "expression8.mp4", loop: true, muted: true },
    { src: base + "expression10.mp4", loop: true, muted: true },
  ],
} satisfies VideoManifest;
