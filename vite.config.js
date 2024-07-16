import {defineConfig as config} from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default config({
	plugins: [react()],
	resolve: {
		alias: {
			ReduxToolkit: '@reduxjs/toolkit',
			$: '/src',
			$c: '/src/component',
			$h: '/src/hook',
			$p: '/src/page',
			$s: '/src/style',
			$sr: '/src/store',
			$sl: '/src/store/slice',
			$u: '/src/utils',
		},
	},
	css: {
		modules: true,
	},
});
