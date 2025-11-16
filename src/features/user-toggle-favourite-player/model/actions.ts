"use server";

import { sql } from "@payloadcms/db-postgres";
import { revalidatePath } from "next/cache";
import { getServerSession } from "@/entities/session";
import type { ActionResult } from "@/shared/model";
import { payload } from "@/shared/model";

export async function toggleFavouritePlayer(
	_prevState: ActionResult,
	formData: FormData,
): Promise<ActionResult> {
	const session = await getServerSession();

	if (!session) {
		return { error: "You must be logged in." };
	}

	const playerId = formData.get("playerId");
	if (!playerId || typeof playerId !== "string") {
		return { error: "Player ID is required." };
	}

	const numericPlayerId = Number.parseInt(playerId, 10);
	if (Number.isNaN(numericPlayerId)) {
		return { error: "Invalid Player ID." };
	}

	const { drizzle } = payload.db;

	await drizzle.execute(sql`
      WITH "target" AS (
        SELECT "id"
        FROM "users_rels"
        WHERE "parent_id" = ${session.user.id}
          AND "path" = 'favouritePlayers'
          AND "players_id" = ${numericPlayerId}
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
        ${numericPlayerId}
      WHERE
        NOT EXISTS (SELECT 1 FROM "delete");
    `);

	revalidatePath("/teams");
	return { success: true };
}
