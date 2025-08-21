// svelte.config.js
import vercel from '@sveltejs/adapter-vercel';

export default {
	kit: {
		adapter: vercel(),
		// IMPORTANT for Vercel: do NOT set kit.paths.base or kit.paths.assets
		// If you previously added a BASE for GitHub Pages, remove it here.
		prerender: {
			// If your whole site is static, you can keep this:
			entries: ['*']
		}
	}
};
