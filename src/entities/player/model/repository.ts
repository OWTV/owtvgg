import { type Player, payload } from "@/shared/model";

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
	});
	return result.docs;
}

export async function getPlayersByRole(role: Player["role"]) {
	const result = await payload.find({
		collection: "players",
		where: {
			role: {
				equals: role,
			},
		},
	});
	return result.docs;
}
