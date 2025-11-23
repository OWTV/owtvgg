import type { CollectionConfig } from "payload";

export const DraftRosters: CollectionConfig = {
	slug: "draft-rosters",
	admin: {
		useAsTitle: "id",
		defaultColumns: ["user", "tournament", "updatedAt"],
	},
	indexes: [
		{
			fields: ["user", "tournament"],
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
			admin: {
				readOnly: true,
			},
		},
		{
			name: "tournament",
			type: "relationship",
			relationTo: "tournaments",
			required: true,
			hasMany: false,
		},
		{
			name: "totalCost",
			type: "number",
			admin: {
				description: "Calculated sum of player costs",
				readOnly: true,
			},
		},
		{
			name: "isValid",
			type: "checkbox",
			defaultValue: false,
			admin: {
				description:
					"True if the roster meets all tournament criteria (budget, role counts)",
				readOnly: true,
			},
		},
		{
			name: "players",
			type: "array",
			label: "Roster Selection",
			fields: [
				{
					type: "row",
					fields: [
						{
							name: "item",
							type: "relationship",
							relationTo: "tournament-players",
							required: true,
						},
						{
							name: "assignedRole",
							type: "text",
							required: true,
							admin: {
								description:
									"The role slot this player is fulfilling (e.g., 'tank', 'flex')",
							},
						},
						{
							name: "isCaptain",
							type: "checkbox",
							label: "Captain (2x Points)",
							defaultValue: false,
						},
					],
				},
			],
		},
	],
};
