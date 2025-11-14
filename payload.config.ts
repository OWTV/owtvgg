import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

const connectionString = process.env.PAYLOAD_CONNECTION_STRING ?? "";
const secret = process.env.PAYLOAD_SECRET ?? "";

export default buildConfig({
	editor: lexicalEditor(),
	collections: [],
	secret,
	debug: true,
	db: postgresAdapter({
		push: true,
		pool: { connectionString },
		migrationDir: "db/migrations",
	}),
	sharp,
	typescript: {
		outputFile: "src/shared/model/payload/types.d.ts",
	},
});
