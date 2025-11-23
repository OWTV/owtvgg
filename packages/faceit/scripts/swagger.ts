import * as fs from "node:fs/promises";
import * as cmd from "cmd-ts";

// This script should work but the server appears to be down at the time of
// writing. I've gone ahead and generated the client by building swagger-codegen
// locally in the meantime.

const command = cmd.command({
	name: "swagger",
	description:
		"Generates a TypeScript Faceit API client using hosted Swagger Codegen",
	version: "1.0.0",
	args: {
		version: cmd.option({
			short: "v",
			long: "version",
			type: cmd.string,
			defaultValue: () => "v4",
		}),
		language: cmd.option({
			short: "l",
			long: "language",
			type: cmd.string,
			defaultValue: () => "typescript-fetch",
		}),
		output: cmd.option({
			short: "o",
			long: "output",
			type: cmd.string,
			defaultValue: () => "src/client.ts",
		}),
	},
	handler: async (args): Promise<void> => {
		const url = `https://open.faceit.com/data/${args.version}/docs/swagger.json`;
		console.log(`Submitting ${url}`);
		const response = await fetch(`https://generator3.swagger.io/api/generate`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				specURL: url,
				lang: "typescript-fetch",
			}),
		});
		if (!response.ok) {
			console.error(`Failed to submit codegen: ${await response.text()}`);
			process.exitCode = 1;
			return;
		}

		console.log(`Writing ${args.output}`);
		await fs.writeFile(args.output, await response.text());
	},
});

cmd
	.run(command, process.argv.slice(2))
	.then()
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
