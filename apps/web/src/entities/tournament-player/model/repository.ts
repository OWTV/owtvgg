import { payload } from "../../../shared/model";

/** Get the list of available players for a tournament, including their CURRENT price. */
export async function getMarketplace(tournamentId: number) {
	const result = await payload.find({
		collection: "tournament-players",
		where: {
			tournament: { equals: tournamentId },
		},
		limit: 300,
		depth: 1,
	});
	return result.docs;
}

/** Helper to calculate the cost of a specific roster */
export async function calculateRosterCost(
	tournamentId: number,
	playerIds: number[],
): Promise<number> {
	if (playerIds.length === 0) return 0;

	const players = await payload.find({
		collection: "tournament-players",
		where: {
			and: [
				{ tournament: { equals: tournamentId } },
				{ player: { in: playerIds } },
			],
		},
		limit: playerIds.length,
	});

	return players.docs.reduce((sum, p) => sum + p.currentPrice, 0);
}
