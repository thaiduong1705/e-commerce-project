/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
	theme: {
		extend: {
			width: {
				main: "1220px",
			},
			backgroundColor: {
				"Bright-Red": "#ee3131",
			},
			colors: {
				"Bright-Red": "#ee3131",
			},
			fontFamily: {
				main: ["Roboto", "sans-serif"],
			},
		},
	},
	plugins: [],
};

