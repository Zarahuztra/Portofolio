import type { VideoManifest } from "$lib/types/video";

const base = "/video/texture/";

export default {
  category: "Texture",
  items: [
    { src: base + "lava1.mp4", loop: true, muted: true },
    { src: base + "stretching1.mp4", loop: true, muted: true },
  ],
} satisfies VideoManifest;
