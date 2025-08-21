// svelte.config.js
import adapter from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV === 'development';
// VIKTIG: nøyaktig repo-navn (case sensitive)
const BASE = dev ? '' : '/Portofolio';

export default {
	kit: {
		adapter: adapter({
			pages: 'docs', // bygg inn i docs/
			assets: 'docs',
			fallback: undefined,
			precompress: false
		}),
		paths: {
			base: BASE // ✅ KUN base. IKKE sett "assets" her.
		},
		prerender: {
			entries: ['*'] // prerender alle ruter
		}
	}
};
