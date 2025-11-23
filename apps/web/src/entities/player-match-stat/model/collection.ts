import type { CollectionConfig } from "payload";

export const PlayerMatchStats: CollectionConfig = {
	slug: "player-match-stats",
	admin: {
		useAsTitle: "id",
		defaultColumns: ["match", "map", "player", "fantasyPoints"],
	},
	access: {
		create: () => false,
		update: () => false,
		delete: () => false,
		read: () => true,
	},
	indexes: [
		{ fields: ["match", "mapNumber"] },
		{ fields: ["player", "round"] },
	],
	fields: [
		{
			name: "tournament",
			type: "relationship",
			relationTo: "tournaments",
			required: true,
		},
		{
			name: "round",
			type: "relationship",
			relationTo: "tournament-rounds",
			required: true,
		},
		{
			name: "match",
			type: "relationship",
			relationTo: "matches",
			required: true,
		},
		{
			name: "map",
			type: "relationship",
			relationTo: "game-maps",
			required: true,
		},
		{
			name: "mapNumber",
			type: "number",
			required: true,
			admin: { description: "1, 2, 3, etc." },
		},
		{
			name: "player",
			type: "relationship",
			relationTo: "tournament-players",
			required: true,
		},
		{
			name: "team",
			type: "relationship",
			relationTo: "teams",
			required: true,
			admin: {
				description: "The team the player was on for THIS specific map.",
			},
		},

		{
			name: "fantasyPoints",
			type: "number",
			required: true,
			defaultValue: 0,
			index: true,
		},
		{
			name: "stats",
			type: "group",
			fields: [
				{
					type: "row",
					fields: [
						{ name: "kills", type: "number", defaultValue: 0 },
						{ name: "deaths", type: "number", defaultValue: 0 },
						{ name: "assists", type: "number", defaultValue: 0 },
					],
				},
				{
					type: "row",
					fields: [
						{ name: "damage", type: "number", defaultValue: 0 },
						{ name: "healing", type: "number", defaultValue: 0 },
						{ name: "mitigated", type: "number", defaultValue: 0 },
					],
				},
			],
		},
	],
};
