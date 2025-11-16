import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { nextCookies } from "better-auth/next-js";
import { buildConfig } from "payload";
import { betterAuthPlugin } from "payload-auth/better-auth";
import sharp from "sharp";

const connectionString = process.env.STORAGE_POSTGRES_URL ?? "";
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
	plugins: [
		betterAuthPlugin({
			betterAuthOptions: {
				emailAndPassword: {
					enabled: true,
				},

				plugins: [nextCookies()],
				user: {
					additionalFields: {
						role: {
							type: "string",
							defaultValue: "user",
							input: false,
						},
					},
				},
			},
			disableDefaultPayloadAuth: true,
			users: {
				slug: "users",
				collectionOverrides: ({ collection }) => ({
					...collection,
					timestamps: true,
					fields: [...collection.fields],
				}),
			},
			accounts: {
				collectionOverrides: ({ collection }) => ({
					...collection,
					timestamps: true,
				}),
			},
			sessions: {
				collectionOverrides: ({ collection }) => ({
					...collection,
					timestamps: true,
				}),
			},
			verifications: {
				collectionOverrides: ({ collection }) => ({
					...collection,
					timestamps: true,
				}),
			},
		}),
	],
	typescript: {
		outputFile: "src/shared/model/payload/types.d.ts",
	},
});
