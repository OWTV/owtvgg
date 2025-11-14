import * as migration_20251114_180537 from "./20251114_180537";

export const migrations = [
	{
		up: migration_20251114_180537.up,
		down: migration_20251114_180537.down,
		name: "20251114_180537",
	},
];
