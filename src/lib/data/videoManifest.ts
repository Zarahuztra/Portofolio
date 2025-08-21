// src/lib/data/videoManifest.ts
export type VideoManifest = {
	category: string;
	items: { src: string; title?: string; poster?: string; loop?: boolean; muted?: boolean }[];
};

export const videoManifests: VideoManifest[] = [
	{
		category: 'Nature',
		items: [
			{ src: '/videos/nature/treeflight1.mp4', loop: true, muted: true },
			{ src: '/videos/nature/beachday1.mp4', loop: true, muted: true }
		]
	},
	{
		category: 'Drive',
		items: [
			{ src: '/videos/drive/trainwatching1.mp4', loop: true, muted: true },
			{ src: '/videos/drive/jeddah1.mp4', loop: true, muted: true }
		]
	},
	{
		category: 'Figure',
		items: [
			{ src: '/videos/figure/rpgfantasy1.mp4', loop: true, muted: true },
			{ src: '/videos/figure/eatingflowers1.mp4', loop: true, muted: true }
		]
	},
	{
		category: 'Food',
		items: [
			{ src: '/videos/food/colaicecream1.mp4', loop: true, muted: true },
			{ src: '/videos/food/shrimps.mp4', loop: true, muted: true }
		]
	},
	{
		category: 'Texture',
		items: [
			{ src: '/videos/texture/lava1.mp4', loop: true, muted: true },
			{ src: '/videos/texture/stretching1.mp4', loop: true, muted: true }
		]
	},
	{
		category: 'Face',
		items: [
			{ src: '/videos/face/expression8.mp4', loop: true, muted: true },
			{ src: '/videos/face/expression10.mp4', loop: true, muted: true }
		]
	},
	{
		category: 'Other',
		items: [
			{ src: '/videos/other/butterflyface1.mp4', loop: true, muted: true },
			{ src: '/videos/other/morphtextdream.mp4', loop: true, muted: true }
		]
	}
];

// Praktisk oppslag per kategori (valgfritt)
export const videosByCategory = Object.fromEntries(
	videoManifests.map((m) => [m.category, m.items])
);
