/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			gridTemplateColumns: {
				// Simple 16 column grid
				'complex-grid': 'repeat(auto-fit, minmax(200px, 1fr));',
			},
			keyframes: {
				flicker: {
					'0%': { opacity: '1' },
					'50%': { opacity: '0.25' },
					'100%': { opacity: '1' },
				},
			},
			animation: {
				flicker: 'flicker 3s ease-in infinite',
			},
		},

	},
	plugins: [],
}
