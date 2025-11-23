import type { CollectionConfig } from "payload";

export const PublishedRosters: CollectionConfig = {
	slug: "published-rosters",
	admin: {
		useAsTitle: "id",
		defaultColumns: ["user", "round", "totalScore"],
	},
	access: {
		create: () => false,
		update: () => false,
		delete: () => false,
		read: () => true,
	},
	indexes: [
		{
			fields: ["user", "round"],
			unique: true,
		},
	],
	fields: [
		{
			name: "user",
			type: "relationship",
			relationTo: "users",
			required: true,
			hasMany: false,
		},
		{
			name: "round",
			type: "relationship",
			relationTo: "rounds",
			required: true,
			hasMany: false,
		},
		{
			type: "row",
			fields: [
				{
					name: "totalScore",
					type: "number",
					index: true,
					defaultValue: 0,
					admin: {
						description: "The final calculated score for this round.",
					},
				},
				{
					name: "rank",
					type: "number",
					admin: {
						description: "Cached global rank for this round.",
					},
				},
			],
		},
		{
			name: "rosterSnapshot",
			type: "array",
			fields: [
				{
					type: "row",
					fields: [
						{
							name: "player",
							type: "relationship",
							relationTo: "tournament-players",
							required: true,
						},
						{
							name: "score",
							type: "number",
							defaultValue: 0,
							admin: {
								description:
									"Points earned by this specific player in this round",
							},
						},
						{
							name: "isCaptain",
							type: "checkbox",
							defaultValue: false,
						},
					],
				},
			],
		},
	],
};
