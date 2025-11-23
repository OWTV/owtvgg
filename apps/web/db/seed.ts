import config from "@payload-config";
import { getPayload } from "payload";

async function seed() {
	const payload = await getPayload({ config });

	payload.logger.info("🌱 Starting Seed...");

	payload.logger.info("🧹 Cleaning up old data...");
	await payload.delete({
		collection: "matches",
		where: { id: { exists: true } },
	});
	await payload.delete({
		collection: "tournament-players",
		where: { id: { exists: true } },
	});
	await payload.delete({
		collection: "tournament-rounds",
		where: { id: { exists: true } },
	});
	await payload.delete({
		collection: "tournaments",
		where: { id: { exists: true } },
	});
	await payload.delete({
		collection: "teams",
		where: { id: { exists: true } },
	});
	await payload.delete({
		collection: "players",
		where: { id: { exists: true } },
	});
	await payload.delete({
		collection: "game-maps",
		where: { id: { exists: true } },
	});

	payload.logger.info("🗺️ Seeding Maps...");
	await payload.create({
		collection: "game-maps",
		data: { name: "King's Row", type: "hybrid" },
	});
	await payload.create({
		collection: "game-maps",
		data: { name: "Ilios", type: "control" },
	});
	await payload.create({
		collection: "game-maps",
		data: { name: "Dorado", type: "escort" },
	});

	payload.logger.info("🛡️ Seeding Teams...");
	const teamFalcons = await payload.create({
		collection: "teams",
		data: { name: "Team Falcons" },
	});
	const crazyRaccoon = await payload.create({
		collection: "teams",
		data: { name: "Crazy Raccoon" },
	});

	payload.logger.info("👤 Seeding Players...");
	const playerProper = await payload.create({
		collection: "players",
		data: { name: "Proper", role: "damage" },
	});
	const playerChiyo = await payload.create({
		collection: "players",
		data: { name: "ChiYo", role: "support" },
	});
	const playerJunbin = await payload.create({
		collection: "players",
		data: { name: "Junbin", role: "tank" },
	});
	const playerLip = await payload.create({
		collection: "players",
		data: { name: "Lip", role: "damage" },
	});
	const playerShu = await payload.create({
		collection: "players",
		data: { name: "Shu", role: "support" },
	});

	payload.logger.info("🏆 Seeding Tournament...");
	const owcsTourney = await payload.create({
		collection: "tournaments",
		data: {
			name: "OWCS Major",
			startDate: new Date().toISOString(),
			endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
			budget: 100,
			transferLimit: 2,
			rosterStructure: [
				{ role: "tank", count: 1 },
				{ role: "damage", count: 2 },
				{ role: "support", count: 2 },
			],
		},
	});

	payload.logger.info("💰 Seeding Marketplace...");
	await payload.create({
		collection: "tournament-players",
		data: {
			tournament: owcsTourney.id,
			player: playerProper.id,
			team: teamFalcons.id,
			role: "damage",
			currentPrice: 25,
		},
	});
	await payload.create({
		collection: "tournament-players",
		data: {
			tournament: owcsTourney.id,
			player: playerChiyo.id,
			team: teamFalcons.id,
			role: "support",
			currentPrice: 15,
		},
	});
	await payload.create({
		collection: "tournament-players",
		data: {
			tournament: owcsTourney.id,
			player: playerJunbin.id,
			team: teamFalcons.id,
			role: "tank",
			currentPrice: 18,
		},
	});
	await payload.create({
		collection: "tournament-players",
		data: {
			tournament: owcsTourney.id,
			player: playerLip.id,
			team: crazyRaccoon.id,
			role: "damage",
			currentPrice: 26,
		},
	});
	await payload.create({
		collection: "tournament-players",
		data: {
			tournament: owcsTourney.id,
			player: playerShu.id,
			team: crazyRaccoon.id,
			role: "support",
			currentPrice: 20,
		},
	});

	payload.logger.info("📅 Seeding Rounds...");
	const round1 = await payload.create({
		collection: "tournament-rounds",
		data: {
			name: "Week 1",
			tournament: owcsTourney.id,
			startDate: new Date().toISOString(),
			lockDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(),
			endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
		},
	});

	payload.logger.info("⚔️ Seeding Matches...");
	await payload.create({
		collection: "matches",
		data: {
			tournament: owcsTourney.id,
			round: round1.id,
			homeTeam: teamFalcons.id,
			awayTeam: crazyRaccoon.id,
			startTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
			externalId: "match-1",
		},
	});

	payload.logger.info("✅ Seed Complete!");
	process.exit(0);
}

seed().catch((err) => {
	console.error(err);
	process.exit(1);
});
