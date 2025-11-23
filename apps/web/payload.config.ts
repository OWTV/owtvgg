import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { nextCookies } from "better-auth/next-js";
import { buildConfig } from "payload";
import { betterAuthPlugin } from "payload-auth/better-auth";
import sharp from "sharp";
import { Players } from "@/entities/player/model/collection";
import { DraftRosters } from "@/entities/roster-draft/model/collection";
import { PublishedRosters } from "@/entities/roster-published/model/collection";
import { Rounds } from "@/entities/round/model/collection";
import { Teams } from "@/entities/team/model/collection";
import { Tournaments } from "@/entities/tournament/model/collection";
import { TournamentPlayers } from "@/entities/tournament-player/model/collection";

const connectionString = process.env.STORAGE_POSTGRES_URL ?? "";
const secret = process.env.PAYLOAD_SECRET ?? "";

export default buildConfig({
	editor: lexicalEditor(),
	collections: [
		DraftRosters,
		PublishedRosters,
		Rounds,
		Tournaments,
		TournamentPlayers,
		Players,
		Teams,
	],
	secret,
	debug: true,
	serverURL: "http://localhost:3000",
	db: postgresAdapter({
		push: false,
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
					fields: [
						...collection.fields,
						{
							name: "favouritePlayers",
							type: "relationship",
							relationTo: "players",
							hasMany: true,
						},
					],
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
