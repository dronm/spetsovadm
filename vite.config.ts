import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

//external library
// const jsLibPath = fileURLToPath(
// 	new URL("file:///home/andrey/www/includes/jsLib/src/"),
// );
// const JS_LIB_DIR = '/home/andrey/www/includes/jsLib/src';
const JS_LIB_DIR = './src/lib';

export default defineConfig({
	plugins: [vue(), vueDevTools(), tailwindcss()],
	resolve: {
		// alias: {
		//     '@': fileURLToPath(new URL('./src', import.meta.url)),
		//     '@lib': fileURLToPath(new URL(JS_LIB_DIR, import.meta.url)),
		// },
		alias: [
			{
				find: '@',
				replacement: fileURLToPath(new URL('./src', import.meta.url)),
			},
			{
				find: '@lib',
				replacement: fileURLToPath(
					new URL(JS_LIB_DIR, import.meta.url),
				),
			},
		],
	},
	// server: {
	//   fs: {
	// 	allow: [JS_LIB_DIR]
	//   }
	// }
});
