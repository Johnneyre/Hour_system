import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter()
	},
	vite: {
	 resolve: {
		 alias: {
		  '$components': '/src/lib/components',
		  'components/*': 'src/lib/components',
		},
	  },
	},
};

export default config;
