import type { Player } from "../../../shared/model";

export const mockDamagePlayer: Player = {
	id: 1,
	name: "Kevster",
	role: "damage",
	createdAt: "2025-11-18T09:29:02.389Z",
	updatedAt: "2025-11-18T09:29:02.389Z",
};

export const mockTankPlayer: Player = {
	id: 2,
	name: "Fearless",
	role: "tank",
	createdAt: "2025-11-18T09:29:02.389Z",
	updatedAt: "2025-11-18T09:29:02.389Z",
};

export const mockSupportPlayer: Player = {
	id: 3,
	name: "Jjonak",
	role: "support",
	createdAt: "2025-11-18T09:29:02.389Z",
	updatedAt: "2025-11-18T09:29:02.389Z",
};

export const mockFlexPlayer: Player = {
	id: 4,
	name: "MirroR",
	role: "flex",
	createdAt: "2025-11-18T09:29:02.389Z",
	updatedAt: "2025-11-18T09:29:02.389Z",
};

export const mockPlayerList: Player[] = [
	mockDamagePlayer,
	mockTankPlayer,
	mockSupportPlayer,
	mockFlexPlayer,
];
