import { redirect } from "next/navigation";
import { getAllTeams } from "../../../entities/team";
import { getUserById } from "../../../entities/user";
import { getServerSession } from "../../../entities/user-session";
import { Typography } from "../../../shared/ui/base";
import { TeamList } from "../../../widgets/team-list";

export default async function TeamsPage() {
	const session = await getServerSession();
	if (!session?.user) redirect("/");

	const [teamsResult, userResult] = await Promise.all([
		getAllTeams({ depth: 1 }),
		getUserById(session.user.id),
	]);

	return (
		<>
			<Typography as={"h1"}>Teams</Typography>
			<TeamList teams={teamsResult} user={userResult} />
		</>
	);
}
