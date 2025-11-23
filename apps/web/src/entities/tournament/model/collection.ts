import type { CollectionConfig } from "payload";

export const Tournaments: CollectionConfig = {
	slug: "tournaments",
	admin: {
		useAsTitle: "name",
		defaultColumns: ["name", "startDate", "endDate"],
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
		},
		{
			type: "row",
			fields: [
				{
					name: "startDate",
					type: "date",
					required: true,
					admin: { date: { pickerAppearance: "dayOnly" } },
				},
				{
					name: "endDate",
					type: "date",
					required: true,
					admin: { date: { pickerAppearance: "dayOnly" } },
				},
			],
		},
		{
			label: "Roster Settings",
			type: "collapsible",
			fields: [
				{
					type: "row",
					fields: [
						{
							name: "budget",
							type: "number",
							required: true,
							defaultValue: 100,
							admin: { description: "Total credits available for drafting" },
						},
						{
							name: "transferLimit",
							type: "number",
							required: true,
							defaultValue: 2,
							admin: { description: "Free transfers allowed per round" },
						},
					],
				},
				{
					name: "rosterStructure",
					type: "array",
					required: true,
					minRows: 1,
					labels: {
						singular: "Position Slot",
						plural: "Position Slots",
					},
					fields: [
						{
							type: "row",
							fields: [
								{
									name: "role",
									type: "select",
									required: true,
									options: [
										{ label: "Tank", value: "tank" },
										{ label: "Damage", value: "damage" },
										{ label: "Support", value: "support" },
									],
								},
								{
									name: "count",
									type: "number",
									required: true,
									min: 1,
									defaultValue: 1,
								},
							],
						},
					],
					defaultValue: [
						{ role: "tank", count: 1 },
						{ role: "damage", count: 2 },
						{ role: "support", count: 2 },
					],
				},
			],
		},
	],
};
