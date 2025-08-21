// src/lib/data/frontendEyecandyManifest.ts
export type EyecandyItem = { src: string; title?: string };
export type EyecandyManifest = { category: string; items: EyecandyItem[] };

// NB: filene må ligge i /static/frontend/eyecandy/*.html
export const frontendEyecandy: EyecandyManifest[] = [
	{
		category: 'Eyecandy',
		items: [
			{ src: '/frontend/eyecandy/parall.html', title: 'Parallax' },
			{ src: '/frontend/eyecandy/glitchytall.html', title: 'Glitchy Tall' },
			{ src: '/frontend/eyecandy/rainingtext.html', title: 'Raining Text' },
			{ src: '/frontend/eyecandy/tunnel.html', title: 'Tunnel' },
			{ src: '/frontend/eyecandy/abstractGL.html', title: 'Abstract GL' },
			{ src: '/frontend/eyecandy/dottedwaves.html', title: 'Dotted Waves' },
			{ src: '/frontend/eyecandy/morphline.html', title: 'Morph Line' },
			{ src: '/frontend/eyecandy/wavingblocks.html', title: 'Waving Blocks' },
			{ src: '/frontend/eyecandy/tube.html', title: 'Tube' },
			{ src: '/frontend/eyecandy/particles1.html', title: 'Particles 1' }
		]
	}
];

export const eyecandyItems = frontendEyecandy[0].items;
