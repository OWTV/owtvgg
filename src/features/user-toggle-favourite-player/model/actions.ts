"use server";

import { sql } from "@payloadcms/db-postgres";
import { revalidatePath } from "next/cache";
import { getServerSession } from "@/entities/session";
import { payload } from "@/shared/model";

export async function toggleFavouritePlayer(playerId: number) {
	const session = await getServerSession();

	if (!session) throw new Error("You must be logged in.");

	try {
		const { drizzle } = payload.db;
		await drizzle.execute(sql`
      WITH "target" AS (
        SELECT "id"
        FROM "users_rels"
        WHERE "parent_id" = ${session.user.id}
          AND "path" = 'favouritePlayers'
          AND "players_id" = ${playerId}
      ),
      "delete" AS (
        DELETE FROM "users_rels"
        WHERE "id" IN (SELECT "id" FROM "target")
        RETURNING "id"
      )
      INSERT INTO "users_rels" ("parent_id", "path", "players_id")
      SELECT
        ${session.user.id},
        'favouritePlayers',
        ${playerId}
      WHERE
        NOT EXISTS (SELECT 1 FROM "delete");
    `);
	} catch (error) {
		console.error(error);
		throw new Error("An unexpected error occurred.");
	}

	revalidatePath("/teams");
}
