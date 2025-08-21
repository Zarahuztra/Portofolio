// src/lib/data/musicManifest.ts
export type MusicItem = { src: string; title?: string; loop?: boolean; muted?: boolean };

export const musicClips: MusicItem[] = [
	{ src: '/musikk/videos/sitar.mp4', title: 'Sitar', loop: true, muted: true },
	{ src: '/musikk/videos/sami.mp4', title: 'Sami', loop: true, muted: true },
	{ src: '/musikk/videos/samidrum.mp4', title: 'Sami Drum', loop: true, muted: true },
	{ src: '/musikk/videos/kenya.mp4', title: 'Kenya', loop: true, muted: true },

	{ src: '/musikk/videos/cubagitar.mp4', title: 'Cuba Guitar', loop: true, muted: true },
	{ src: '/musikk/videos/fiolin.mp4', title: 'Violin', loop: true, muted: true },
	{ src: '/musikk/videos/mongolia.mp4', title: 'Mongolia', loop: true, muted: true },
	{ src: '/musikk/videos/flute.mp4', title: 'Flute', loop: true, muted: true },

	{ src: '/musikk/videos/waterydj.mp4', title: 'Water DJ', loop: true, muted: true },
	{ src: '/musikk/videos/knobs.mp4', title: 'Knobs', loop: true, muted: true },
	{ src: '/musikk/videos/flowdj.mp4', title: 'Flow DJ', loop: true, muted: true },

	{ src: '/musikk/videos/math.mp4', title: 'Math', loop: true, muted: true },
	{ src: '/musikk/videos/guitarwave.mp4', title: 'Guitarwave', loop: true, muted: true },
	{ src: '/musikk/videos/prog.mp4', title: 'Prog', loop: true, muted: true }
];
