type MediaItem = { src: string; title?: string; poster?: string };
export type MediaManifest = { category: string; items: MediaItem[] };

export const functionManifests: MediaManifest[] = [
  {
    category: "Frontend – Interaktiv",
    items: [
      {
        src: "/frontend/interaktiv/bildeeks/voxel.png",
        title: "Voxel (interaktiv demo)",
      },
      {
        src: "/frontend/interaktiv/bildeeks/perlinsmoke.png",
        title: "Perlin Smoke (interaktiv demo)",
      },
    ],
  },
  {
    category: "Frontend – Eyecandy",
    items: [
      {
        src: "/frontend/eyecandy/bilder/wavingblocks.png",
        title: "Waving Blocks (visuell effekt)",
      },
      {
        src: "/frontend/eyecandy/bilder/parall.png",
        title: "Parallaks (visuell effekt)",
      },
    ],
  },
];

export const functionsByCategory = Object.fromEntries(
  functionManifests.map((m) => [m.category, m.items])
);
