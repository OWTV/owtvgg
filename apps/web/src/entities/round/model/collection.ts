import type { CollectionConfig } from "payload";

export const Rounds: CollectionConfig = {
	slug: "rounds",
	admin: {
		useAsTitle: "name",
		defaultColumns: ["name", "tournament", "lockDate", "endDate"],
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
			admin: {
				placeholder: "e.g. Week 1, Quarter Finals",
			},
		},
		{
			name: "tournament",
			type: "relationship",
			relationTo: "tournaments",
			required: true,
			hasMany: false,
			index: true,
		},
		{
			name: "startDate",
			type: "date",
			required: true,
			admin: {
				description: "When this round opens for drafting/changes.",
				date: {
					pickerAppearance: "dayAndTime",
				},
			},
		},
		{
			name: "lockDate",
			type: "date",
			required: true,
			admin: {
				description:
					"STRICT DEADLINE. Rosters are snapshot at this exact time.",
				date: {
					pickerAppearance: "dayAndTime",
				},
			},
		},
		{
			name: "endDate",
			type: "date",
			required: true,
			admin: {
				description: "When the last match of this round concludes.",
				date: {
					pickerAppearance: "dayAndTime",
				},
			},
		},
	],
};
