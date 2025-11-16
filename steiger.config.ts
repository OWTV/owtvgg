import fsd from "@feature-sliced/steiger-plugin";
import { defineConfig } from "steiger";

export default defineConfig([
	...fsd.configs.recommended,
	{
		// Allow payload folder to use 'api' folder name
		files: ["./src/app/**/*payload*/**"],
		rules: {
			"fsd/no-reserved-folder-names": "off",
		},
	},
	{
		// Allow features to have one only reference
		files: ["./src/features/**"],
		rules: {
			"fsd/insignificant-slice": "off",
		},
	},
	{
		// Temporarily disabled while we have few slices
		files: ["./src/features/**"],
		rules: {
			"fsd/repetitive-naming": "off",
		},
	},
]);
