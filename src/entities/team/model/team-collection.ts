import type { CollectionConfig } from "payload";

export const Teams: CollectionConfig = {
	slug: "teams",
	timestamps: true,
	admin: {
		useAsTitle: "name",
		defaultColumns: ["name", "updatedAt"],
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
		},
		{
			name: "players",
			type: "relationship",
			relationTo: "players",
			hasMany: true,
		},
	],
};
