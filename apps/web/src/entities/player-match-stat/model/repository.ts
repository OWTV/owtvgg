import { payload } from "@/shared/model";

/** Calculate total points for a specific player in a specific round. */
export async function getPlayerRoundScore(
	tournamentPlayerId: number,
	roundId: number,
) {
	const stats = await payload.find({
		collection: "player-match-stats",
		where: {
			and: [
				{ player: { equals: tournamentPlayerId } },
				{ round: { equals: roundId } },
			],
		},
		limit: 100,
	});

	return stats.docs.reduce((sum, stat) => sum + stat.fantasyPoints, 0);
}

/** Get raw stats for a specific match (e.g. for a Match Detail page) */
export async function getMatchStats(matchId: number) {
	const stats = await payload.find({
		collection: "player-match-stats",
		where: {
			match: { equals: matchId },
		},
		limit: 100,
		sort: "mapNumber",
	});

	return stats.docs;
}
