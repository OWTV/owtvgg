import { isPlayer } from "@/entities/player";

import { ToggleFavouriteButton } from "@/features/user-toggle-favourite-player";
import type { Player, Team } from "@/shared/model";
import { Card, CardContent, Typography } from "@/shared/ui";

interface TeamListProps {
	teams: Team[];
	favouritePlayerIds: number[];
}

export function TeamList({ teams, favouritePlayerIds }: TeamListProps) {
	if (!teams.length) {
		return <p className="text-muted-foreground">No teams available.</p>;
	}

	return teams.map((team) => (
		<section key={team.id} className="py-4">
			<Typography as={"h2"}>{team.name}</Typography>
			<PlayerListGrid
				players={team.players}
				favouritePlayerIds={favouritePlayerIds}
			/>
		</section>
	));
}

interface PlayerGridProps {
	players: Team["players"];
	favouritePlayerIds: number[];
}

function PlayerListGrid({ players, favouritePlayerIds }: PlayerGridProps) {
	const filteredPlayers = players?.filter(isPlayer);

	return (
		<div className="grid grid-cols-4 gap-4">
			{filteredPlayers?.map((player) => (
				<PlayerCard
					key={player.id}
					player={player}
					isFavourite={favouritePlayerIds.includes(player.id)}
				/>
			))}
		</div>
	);
}

function PlayerCard({
	player,
	isFavourite,
}: {
	player: Player;
	isFavourite: boolean;
}) {
	return (
		<Card>
			<CardContent className="flex justify-between items-center">
				<div>{player.name}</div>
				<ToggleFavouriteButton isFavourite={isFavourite} playerId={player.id} />
			</CardContent>
		</Card>
	);
}
