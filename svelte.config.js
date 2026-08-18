import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter({
            fallback: 'index.html',
            pages: 'dist',
            assets: 'dist',
        }),
        appDir: 'app',
        files: {
            assets: 'public',
        },
    },
}
