import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
const dev = process.argv.includes('dev');

export default {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '200.html' // SPA-style, optional
		}),
		paths: {
			base: dev ? '' : '/Portofolio'
		},
		prerender: {
			entries: ['*']
		}
	}
};
