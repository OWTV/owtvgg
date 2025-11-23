import type { CollectionConfig } from "payload";

export const Players: CollectionConfig = {
	slug: "players",
	timestamps: true,
	admin: {
		useAsTitle: "name",
		defaultColumns: ["name", "role", "updatedAt"],
	},
	access: {
		// Player entities are referenced in DraftRoster and PublishedRoster
		// Deleting players would break the history
		delete: () => false,
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
		},
		{
			name: "role",
			type: "select",
			options: [
				{ label: "Tank", value: "tank" },
				{ label: "Support", value: "support" },
				{ label: "Damage", value: "damage" },
				{ label: "Flex", value: "flex" },
			],
			required: true,
		},
		{
			name: "isArchived",
			type: "checkbox",
			label: "Archived / Retired",
			defaultValue: false,
			admin: {
				position: "sidebar",
				description:
					"Hide this player from new drafts without deleting history.",
			},
		},
	],
};
