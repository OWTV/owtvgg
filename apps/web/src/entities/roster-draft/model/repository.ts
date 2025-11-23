import { payload } from "@/shared/model";

export async function getDraftRoster(userId: number, tournamentId: number) {
	const result = await payload.find({
		collection: "draft-rosters",
		where: {
			and: [
				{ user: { equals: userId } },
				{ tournament: { equals: tournamentId } },
			],
		},
		limit: 1,
		depth: 2,
	});

	return result.docs[0] || null;
}

export async function createInitialDraft(userId: number, tournamentId: number) {
	return await payload.create({
		collection: "draft-rosters",
		data: {
			user: userId,
			tournament: tournamentId,
			players: [],
			totalCost: 0,
			isValid: false,
		},
	});
}
