import { payload } from "@/shared/model";

interface GetUserByIdProps {
	depth?: number;
}
export async function getUserById(
	id: string | number,
	{ depth = 0 }: GetUserByIdProps = {},
) {
	return await payload.findByID({
		collection: "users",
		id,
		depth,
	});
}

export async function setUserFavouritePlayers(
	userId: string | number,
	favouritePlayers: number[],
) {
	return await payload.update({
		collection: "users",
		id: userId,
		data: {
			favouritePlayers,
		},
	});
}
