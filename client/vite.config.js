import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "fs/promises";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 5000,
	},
	clearScreen: true,
});

