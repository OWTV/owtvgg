import { redirect } from "next/navigation";
import { getServerSession } from "@/entities/session";
import type { Player } from "@/shared/model";
import { payload } from "@/shared/model";
import { Typography } from "@/shared/ui/base";
import { TeamList } from "@/widgets/team-list";

export default async function TeamsPage() {
	const session = await getServerSession();
	if (!session?.user) {
		redirect("/");
	}

	const [teamResult, userResult] = await Promise.all([
		payload.find({
			collection: "teams",
			depth: 1,
			sort: "name",
		}),
		payload.findByID({
			collection: "users",
			id: session.user.id,
			depth: 0,
		}),
	]);

	const teams = teamResult.docs;

	const favouritePlayerIds =
		userResult.favouritePlayers?.map((fav: number | Player) =>
			typeof fav === "number" ? fav : fav.id,
		) ?? [];

	return (
		<main className="container pt-16">
			<Typography as={"h1"}>Teams</Typography>
			<TeamList teams={teams} favouritePlayerIds={favouritePlayerIds} />
		</main>
	);
}
