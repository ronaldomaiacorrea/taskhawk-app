import { defineConfig, UserConfigExport } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		proxy: {
			'/api': {
				target: 'http://localhost:3030',
				changeOrigin: true,
			},
		},
	},
	test: {
		globals: true,
		include: ['src/tests/**/*.spec.{ts,tsx}'],
		environment: 'jsdom',
		setupFiles: ['src/tests/setupTests/setupTests.ts'],
	},
} as UserConfigExport);
