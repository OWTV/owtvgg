import type { Player } from "@/shared/model";

export function isPlayer(doc: number | Player): doc is Player {
	return typeof doc === "object" && doc !== null && "name" in doc;
}
