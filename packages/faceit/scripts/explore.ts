import * as readline from "node:readline/promises";
import { Client as ClientInternal } from "@faceit/internal";
import { paginate } from "@faceit/pagination";
import { Client as ClientV4 } from "@faceit/v4";
import * as cmd from "cmd-ts";
import * as dotenv from "dotenv";

dotenv.config();

const io = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const v4OrganizerChampionships = cmd.command({
	name: "championships",
	description: "Explore championships in the v4 API",
	args: {
		key: cmd.option({
			short: "k",
			long: "key",
			env: "FACEIT_API_KEY",
			type: cmd.string,
			description: "Your Faceit API key",
		}),
		organizer: cmd.option({
			short: "o",
			long: "organizer",
			type: cmd.string,
			defaultValue: () => "f0e8a591-08fd-4619-9d59-d97f0571842e", // OWCS
		}),
	},
	handler: async (args): Promise<void> => {
		const client = new ClientV4({ apiKey: `Bearer ${args.key}` });
		for await (const page of paginate((offset?: number, limit?: number) =>
			client.organizers.getOrganizerChampionships(
				args.organizer,
				offset,
				limit,
			),
		)) {
			for (const championship of page) {
				console.log(`${championship.id}: ${championship.name}`);
			}
			const input = await io.question("> ");
			if (input.trim()) {
				break;
			}
		}
	},
});

const v4OrganizerTournaments = cmd.command({
	name: "tournaments",
	description: "Explore tournaments in the v4 API",
	args: {
		key: cmd.option({
			short: "k",
			long: "key",
			env: "FACEIT_API_KEY",
			type: cmd.string,
			description: "Your Faceit API key",
		}),
		organizer: cmd.option({
			short: "o",
			long: "organizer",
			type: cmd.string,
			defaultValue: () => "f0e8a591-08fd-4619-9d59-d97f0571842e", // OWCS
		}),
	},
	handler: async (args): Promise<void> => {
		const client = new ClientV4({ apiKey: `Bearer ${args.key}` });
		for await (const page of paginate((offset?: number, limit?: number) =>
			client.organizers.getOrganizerTournaments(
				args.organizer,
				undefined,
				offset,
				limit,
			),
		)) {
			for (const tournament of page) {
				console.log(`${tournament.tournament_id}: ${tournament.name}`);
			}
			const input = await io.question("> ");
			if (input.trim()) {
				break;
			}
		}
	},
});

const v4 = cmd.subcommands({
	name: "v4",
	description: "Explore the v4 API",
	cmds: {
		championships: v4OrganizerChampionships,
		tournaments: v4OrganizerTournaments,
	},
});

const internalLeague = cmd.command({
	name: "league",
	description: "Explore a league in the internal API",
	args: {
		league: cmd.option({
			short: "l",
			long: "league",
			type: cmd.string,
			description: "The UUID of the league to examine",
			defaultValue: () => "88c7f7ec-4cb8-44d3-a5db-6e808639c232", // OWCS
		}),
	},
	handler: async (args): Promise<void> => {
		const client = new ClientInternal();
		console.log(JSON.stringify(await client.getLeague(args.league), null, 2));
	},
});

const internalLeagueSeasons = cmd.command({
	name: "seasons",
	description: "Explore a league in the internal API",
	args: {
		league: cmd.option({
			short: "l",
			long: "league",
			type: cmd.string,
			description: "The UUID of the league to examine",
			defaultValue: () => "88c7f7ec-4cb8-44d3-a5db-6e808639c232", // OWCS
		}),
	},
	handler: async (args): Promise<void> => {
		const client = new ClientInternal();
		console.log(
			JSON.stringify(await client.getLeagueSeasons(args.league), null, 2),
		);
	},
});

const internalLeagueSeasonStages = cmd.command({
	name: "stages",
	description: "Explore stages through all seasons of OWCS",
	args: {
		league: cmd.option({
			short: "l",
			long: "league",
			type: cmd.string,
			description: "The UUID of the league to examine",
			defaultValue: () => "88c7f7ec-4cb8-44d3-a5db-6e808639c232", // OWCS
		}),
	},
	handler: async (args): Promise<void> => {
		const client = new ClientInternal();
		for (const season of await client.getLeagueSeasons(args.league)) {
			const tree = await client.getSeasonTree(season.id);
			for (const region of tree.regions) {
				for (const division of region.divisions) {
					for (const stage of division.stages) {
						console.log(
							`${stage.id}: ${season.season_name} / ${region.name} / ${division.name} / ${stage.name}`,
						);
					}
				}
			}
		}
	},
});

const internal = cmd.subcommands({
	name: "internal",
	description: "Explore the internal API",
	cmds: {
		league: internalLeague,
		seasons: internalLeagueSeasons,
		stages: internalLeagueSeasonStages,
	},
});

const command = cmd.subcommands({
	name: "explore",
	description: "Explore data in the Faceit API into the database",
	version: "1.0.0",
	cmds: { v4, internal },
});

cmd
	.run(command, process.argv.slice(2))
	.then()
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
