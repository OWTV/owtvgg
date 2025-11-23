import { payload, type Team } from "../../../shared/model";

interface GetAllTeamsProps {
	depth?: number;
	sort?: keyof Team | string;
	limit?: number;
}
export async function getAllTeams({
	depth = 0,
	sort = "name",
	limit = 100,
}: GetAllTeamsProps = {}) {
	const result = await payload.find({
		collection: "teams",
		depth,
		sort,
		limit,
	});
	return result.docs;
}
