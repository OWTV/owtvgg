import { ToggleFavouriteButton } from "@/features/user-toggle-favourite-player";
import type { Player, Team } from "@/shared/model";
import type { User } from "@/shared/model/payload/types";
import { Card, CardContent, Typography } from "@/shared/ui/base";

interface TeamListProps {
	teams: Team[];
	user: User;
}

export function TeamList({ teams, user }: TeamListProps) {
	const favouritePlayerIds = user.favouritePlayers?.map(asPlayerId) ?? [];

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
	const filteredPlayers = players?.filter((p) => typeof p !== "number");

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

function asPlayerId(fav: number | Player) {
	return typeof fav === "number" ? fav : fav.id;
}
