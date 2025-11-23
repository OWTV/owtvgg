import type { CollectionConfig } from "payload";

export const GameMaps: CollectionConfig = {
	slug: "game-maps",
	admin: {
		useAsTitle: "name",
		defaultColumns: ["name", "type"],
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
			unique: true,
		},
		{
			name: "type",
			type: "select",
			required: true,
			options: [
				{ label: "Control", value: "control" },
				{ label: "Escort", value: "escort" },
				{ label: "Hybrid", value: "hybrid" },
				{ label: "Push", value: "push" },
				{ label: "Flashpoint", value: "flashpoint" },
				{ label: "Clash", value: "clash" },
			],
		},
		{
			name: "image",
			type: "text",
			required: false,
		},
	],
};
