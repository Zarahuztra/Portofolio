type MediaItem = { src: string; title?: string; poster?: string };
export type MediaManifest = { category: string; items: MediaItem[] };

export const imageManifests: MediaManifest[] = [
	{
		category: 'Creatures',
		items: [{ src: '/bilder/creatures/dropcrea1.jpg' }, { src: '/bilder/creatures/joyful.jpg' }]
	},
	{
		category: 'Kunst',
		items: [
			{ src: '/bilder/kunst/coloredgateway1.jpg' },
			{ src: '/bilder/kunst/digitalflowers1.jpg' }
		]
	},
	{
		category: 'Underholdning',
		items: [
			{ src: '/bilder/underholdning/peaks1.jpg' },
			{ src: '/bilder/underholdning/floatingmarket.jpg' }
		]
	},
	{
		category: 'Webdesign – Web',
		items: [
			{ src: '/bilder/webdesign/web/music2.jpg' },
			{ src: '/bilder/webdesign/web/thrift2.jpg' }
		]
	},
	{
		category: 'Webdesign – Assets',
		items: [
			{ src: '/bilder/webdesign/assets/waves1.jpg' },
			{ src: '/bilder/webdesign/assets/arrows3.jpg' }
		]
	},
	{
		category: 'Webdesign – Mobile',
		items: [
			{ src: '/bilder/webdesign/mobile/framerate1.jpg' },
			{ src: '/bilder/webdesign/mobile/moboverview1.jpg' }
		]
	},
	{
		category: 'Spilldesign',
		items: [
			{ src: '/bilder/spilldesign/skywars1.jpg' },
			{ src: '/bilder/spilldesign/cubiverse.jpg' }
		]
	},
	{
		category: 'Bygninger',
		items: [{ src: '/bilder/bygninger/crazycity1.jpg' }, { src: '/bilder/bygninger/castle2.jpg' }]
	},
	{
		category: 'Fartøy',
		items: [{ src: '/bilder/fartoy/musclecar1.jpg' }, { src: '/bilder/fartoy/flightovercity.jpg' }]
	},
	{
		category: 'Karakterdesign',
		items: [
			{ src: '/bilder/karakterdesign/ybgirl2.jpg' },
			{ src: '/bilder/karakterdesign/guru1.jpg' }
		]
	},
	{
		category: 'Landskap',
		items: [{ src: '/bilder/landskap/miday1.jpg' }, { src: '/bilder/landskap/graycoast.jpg' }]
	},
	{
		category: 'Logo',
		items: [{ src: '/bilder/logo/arka2.jpg' }, { src: '/bilder/logo/dzf1.jpg' }]
	},
	{
		category: 'Miniatyr',
		items: [
			{ src: '/bilder/miniatyr/wingeddefender.jpg' },
			{ src: '/bilder/miniatyr/mappoint.jpg' }
		]
	},
	{
		category: 'Tekstur',
		items: [{ src: '/bilder/tekstur/woodtexture1.png' }, { src: '/bilder/tekstur/vanillaice.jpg' }]
	},
	{
		category: 'Products – Devices',
		items: [
			{ src: '/bilder/products/devices/device1.jpg' },
			{ src: '/bilder/products/devices/musicplayer1.jpg' }
		]
	},
	{
		category: 'Products – Shoes',
		items: [
			{ src: '/bilder/products/shoes/golfsneaker.jpg' },
			{ src: '/bilder/products/shoes/bysneaker.jpg' }
		]
	}
];

export const bilderByCategory = Object.fromEntries(
	imageManifests.map((m) => [m.category, m.items])
);
