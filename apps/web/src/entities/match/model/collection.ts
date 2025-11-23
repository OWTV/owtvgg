import type { CollectionConfig } from "payload";

export const Matches: CollectionConfig = {
	slug: "matches",
	admin: {
		useAsTitle: "externalId",
		defaultColumns: ["startTime", "homeTeam", "awayTeam", "completedAt"],
	},
	fields: [
		{
			name: "tournament",
			type: "relationship",
			relationTo: "tournaments",
			required: true,
			index: true,
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "round",
			type: "relationship",
			relationTo: "tournament-rounds",
			required: true,
			index: true,
			admin: {
				position: "sidebar",
			},
		},
		{
			type: "row",
			fields: [
				{
					name: "startTime",
					type: "date",
					required: true,
					admin: {
						date: { pickerAppearance: "dayAndTime" },
						description: "When the match is scheduled to begin.",
					},
				},
				{
					// REPLACES 'status' enum
					name: "completedAt",
					type: "date",
					admin: {
						date: { pickerAppearance: "dayAndTime" },
						description: "If set, the match is considered finished.",
					},
				},
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "homeTeam",
					type: "relationship",
					relationTo: "teams",
					required: true,
					label: "Home Team",
				},
				{
					name: "homeScore",
					type: "number",
					min: 0,
					defaultValue: 0,
					admin: { width: "20%" },
				},
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "awayTeam",
					type: "relationship",
					relationTo: "teams",
					required: true,
					label: "Away Team",
				},
				{
					name: "awayScore",
					type: "number",
					min: 0,
					defaultValue: 0,
					admin: { width: "20%" },
				},
			],
		},
		{
			name: "winner",
			type: "relationship",
			relationTo: "teams",
			admin: {
				description: "Optional: Explicitly mark the winner.",
			},
		},
		{
			name: "externalId",
			type: "text",
			index: true,
			admin: {
				position: "sidebar",
				readOnly: true,
			},
		},
	],
};
