import type { CollectionConfig } from "payload";

export const TournamentPlayers: CollectionConfig = {
	slug: "tournament-players",
	admin: {
		useAsTitle: "id",
		defaultColumns: ["player", "tournament", "team", "currentPrice"],
	},
	indexes: [
		{
			fields: ["tournament", "role"],
		},
	],
	fields: [
		{
			name: "tournament",
			type: "relationship",
			relationTo: "tournaments",
			required: true,
			hasMany: false,
		},
		{
			name: "player",
			type: "relationship",
			relationTo: "players",
			required: true,
			hasMany: false,
		},
		{
			name: "team",
			type: "relationship",
			relationTo: "teams",
			required: true,
			admin: {
				description: "The team they are playing for IN THIS tournament.",
			},
		},
		{
			name: "role",
			type: "select",
			options: [
				{ label: "Tank", value: "tank" },
				{ label: "Damage", value: "damage" },
				{ label: "Support", value: "support" },
			],
			required: true,
			admin: {
				description: "Their locked role for this tournament.",
			},
		},
		{
			name: "currentPrice",
			type: "number",
			required: true,
			defaultValue: 10,
			index: true,
			admin: {
				description:
					"The cost to draft this player RIGHT NOW (for the next open round).",
			},
		},
		{
			name: "priceHistory",
			type: "array",
			admin: {
				readOnly: true,
			},
			fields: [
				{
					name: "round",
					type: "relationship",
					relationTo: "tournament-rounds",
					required: true,
				},
				{
					name: "price",
					type: "number",
					required: true,
				},
			],
		},
	],
};
