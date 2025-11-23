import { type Player, payload } from "../../../shared/model";

export async function getPlayerById(id: number) {
	return await payload.findByID({
		collection: "players",
		id,
	});
}

interface GetAllPlayersProps {
	depth?: number;
	sort?: keyof Player | string;
	limit?: number;
	includeArchived?: boolean;
}

export async function getAllPlayers({
	depth = 0,
	sort = "name",
	limit = 100,
}: GetAllPlayersProps = {}) {
	const result = await payload.find({
		collection: "players",
		depth,
		sort,
		limit,
		where: { isArchived: { not_equals: true } },
	});
	return result.docs;
}

export async function getPlayersByRole(role: Player["role"]) {
	const result = await payload.find({
		collection: "players",
		where: {
			and: [{ role: { equals: role } }, { isArchived: { not_equals: true } }],
		},
	});
	return result.docs;
}
