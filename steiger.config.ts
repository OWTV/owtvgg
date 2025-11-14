import fsd from "@feature-sliced/steiger-plugin";
import { defineConfig } from "steiger";

export default defineConfig([
	...fsd.configs.recommended,
	{
		files: ["./src/app/**/*payload*/**"],
		rules: {
			"fsd/no-reserved-folder-names": "off",
		},
	},
]);
