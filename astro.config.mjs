import react from "@astrojs/react";
import { defineConfig } from "astro/config";

// https://astro.build/config
// React integration is required for the R3F hero scene island only.
// Above-the-fold content remains pure Astro / zero JS.
export default defineConfig({
	site: "https://getbrainstorm.online",
	integrations: [react()],
	build: {
		inlineStylesheets: "auto",
	},
	compressHTML: true,
	devToolbar: {
		enabled: false,
	},
	vite: {
		build: {
			cssCodeSplit: false,
		},
		ssr: {
			noExternal: ["three", "@react-three/fiber", "@react-three/drei", "@react-three/postprocessing"],
		},
		// `postprocessing` references __BUNDLED_DEV__ as a build-time global;
		// Vite needs an explicit define or it throws at runtime.
		// https://github.com/pmndrs/postprocessing/issues/665
		define: {
			__BUNDLED_DEV__: "false",
		},
	},
});
