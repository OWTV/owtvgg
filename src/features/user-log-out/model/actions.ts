"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import type { ActionResult } from "@/shared/model";
import { auth } from "@/shared/model";

export async function logout(
	_prevState: ActionResult,
	_formData: FormData,
): Promise<ActionResult> {
	const response = await auth.signOut({
		headers: await headers(),
		asResponse: true,
	});

	revalidatePath("/");

	if (response.ok) return { success: true };

	console.error(await response.json());
	return { error: "An unexpected error occurred. Please try again." };
}
