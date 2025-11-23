"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "../../../entities/session";
import { getUserById, setUserFavouritePlayers } from "../../../entities/user";

export async function toggleFavouritePlayer(playerId: number) {
	const session = await getServerSession();
	if (!session) throw new Error("You must be logged in.");

	try {
		const user = await getUserById(session.user.id);

		const currentFavouritesIds =
			user.favouritePlayers?.map((p) => (typeof p === "number" ? p : p.id)) ??
			[];

		const isFavourite = currentFavouritesIds.includes(playerId);
		const newFavourites = isFavourite
			? currentFavouritesIds.filter((id) => id !== playerId)
			: [...currentFavouritesIds, playerId];

		await setUserFavouritePlayers(session.user.id, newFavourites);
	} catch (error) {
		console.error(error);
		throw new Error("An unexpected error occurred.");
	} finally {
		revalidatePath("/teams");
	}
}
