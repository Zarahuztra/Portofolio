// src/lib/data/textLogosManifest.ts
export type TextMedia =
	| { type: 'image'; src: string; title?: string }
	| { type: 'video'; src: string; title?: string; loop?: boolean; muted?: boolean };

export const textLogos: TextMedia[] = [
	// Bilder (static/tekst/bilder)
	{ type: 'image', src: '/tekst/bilder/permafrost.png', title: 'Permafrost' },
	{ type: 'image', src: '/tekst/bilder/hogarth.png', title: 'Hogarth' },
	{ type: 'image', src: '/tekst/bilder/bridgehead.png', title: 'Bridgehead Media' },
	{ type: 'image', src: '/tekst/bilder/translated.png', title: 'Translated' },

	// Videoer (static/tekst/videos)
	{ type: 'video', src: '/tekst/videos/screens.mp4', title: 'Screens', loop: true, muted: true },
	{ type: 'video', src: '/tekst/videos/glasses.mp4', title: 'Glasses', loop: true, muted: true },
	{ type: 'video', src: '/tekst/videos/analysis.mp4', title: 'Analysis', loop: true, muted: true },
	{ type: 'video', src: '/tekst/videos/apple.mp4', title: 'Apple', loop: true, muted: true }
];
