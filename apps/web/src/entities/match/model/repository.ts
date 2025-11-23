import type { Where } from "payload";
import { payload } from "../../../shared/model";

export async function getMatchesByRound(roundId: number) {
	const result = await payload.find({
		collection: "matches",
		where: {
			round: { equals: roundId },
		},
		sort: "startTime",
		depth: 1,
	});
	return result.docs;
}

/** Matches that haven't started yet, OR have started but aren't finished (Live). */
export async function getUpcomingAndLiveMatches(limit = 5) {
	const result = await payload.find({
		collection: "matches",
		where: {
			completedAt: { exists: false },
		},
		sort: "startTime",
		limit,
		depth: 1,
	});
	return result.docs;
}

/** Strictly "Live" matches (Started, but not finished) */
export async function getLiveMatches() {
	const now = new Date();
	const result = await payload.find({
		collection: "matches",
		where: {
			and: [
				{ startTime: { less_than_equal: now } },
				{ completedAt: { exists: false } },
			],
		},
		sort: "startTime",
		depth: 1,
	});
	return result.docs;
}

/**  Matches that are finished */
export async function getCompletedMatches(roundId?: number, limit = 10) {
	const where: Where = {
		completedAt: { exists: true },
	};

	if (roundId) {
		where.round = { equals: roundId };
	}

	const result = await payload.find({
		collection: "matches",
		where,
		sort: "-completedAt",
		limit,
		depth: 1,
	});
	return result.docs;
}
