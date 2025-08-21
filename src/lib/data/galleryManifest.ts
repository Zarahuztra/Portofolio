export type GalleryCategory = {
	id: string; // url-del / tab-id
	title: string; // visningsnavn i fanen
	base: string; // rot i /static
	files: string[]; // filnavn i mappa
};

export const galleryCategories: GalleryCategory[] = [
	{
		id: 'karakterdesign',
		title: 'Karakterdesign',
		base: '/bilder/karakterdesign',
		files: [
			'skullbound1.jpg',
			'scully1.jpg',
			'emberlight1.jpg',
			'naughty1.jpg',
			'windy1.jpg',
			'lookingback1.jpg',
			'oddguy1.jpg',
			'clothy.jpg',
			'grendel.jpg',
			'alps1.jpg',
			'ybgirl1.jpg',
			'ybgirl2.jpg',
			'brgirl1.jpg',
			'brgirl2.jpg',
			'woodmagic1.jpg',
			'hairy1.jpg',
			'oracle1.jpg',
			'paperguy1.jpg',
			'dwarfy1.jpg',
			'shaman1.jpg',
			'faery1.jpg',
			'regguy1.jpg',
			'withered1.jpg',
			'paperboy1.jpg'
		]
	}

	// legg til flere når du vil:
	// {
	//   id: 'landskap',
	//   title: 'Landskap',
	//   base: '/bilder/landskap',
	//   files: [ 'fjord1.jpg', 'forest2.jpg', ... ]
	// }
];
