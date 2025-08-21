// src/lib/data/imageManifest.ts
type MediaItem = { src: string; title?: string; poster?: string };
export type MediaManifest = { category: string; items: MediaItem[] };

function cat(label: string, folder: string, files: string[]): MediaManifest {
	return {
		category: label,
		items: files.map((f) => ({ src: `/bilder/${folder}/${f}` }))
	};
}

export const imageManifests: MediaManifest[] = [
	cat('Creatures', 'creatures', ['dropcrea1.jpg', 'joyful.jpg']),
	cat('Kunst', 'kunst', ['coloredgateway1.jpg', 'digitalflowers1.jpg']),
	cat('Underholdning', 'underholdning', ['peaks1.jpg', 'floatingmarket.jpg']),
	cat('Webdesign – Web', 'webdesign/web', ['music2.jpg', 'thrift2.jpg']),
	cat('Webdesign – Assets', 'webdesign/assets', ['waves1.jpg', 'arrows3.jpg']),
	cat('Webdesign – Mobile', 'webdesign/mobile', ['framerate1.jpg', 'moboverview1.jpg']),
	cat('Spilldesign', 'spilldesign', ['skywars1.jpg', 'cubiverse.jpg']),
	cat('Bygninger', 'bygninger', ['crazycity1.jpg', 'castle2.jpg']),
	cat('Fartøy', 'fartoy', ['musclecar1.jpg', 'flightovercity.jpg']),
	cat('Karakterdesign', 'karakterdesign', ['ybgirl2.jpg', 'guru1.jpg']),
	cat('Landskap', 'landskap', ['miday1.jpg', 'graycoast.jpg']),
	cat('Logo', 'logo', ['arka2.jpg', 'dzf1.jpg']),
	cat('Miniatyr', 'miniatyr', ['wingeddefender.jpg', 'mappoint.jpg']),
	cat('Tekstur', 'tekstur', ['woodtexture1.png', 'vanillaice.jpg']),
	cat('Products – Devices', 'products/devices', ['device1.jpg', 'musicplayer1.jpg']),
	cat('Products – Shoes', 'products/shoes', ['golfsneaker.jpg', 'bysneaker.jpg'])
];

export const bilderByCategory = Object.fromEntries(
	imageManifests.map((m) => [m.category, m.items])
);
