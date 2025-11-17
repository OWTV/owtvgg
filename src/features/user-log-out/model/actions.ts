"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import type { ActionState } from "@/shared/model";
import { auth } from "@/shared/model";

export async function logout(
	_prevState: ActionState,
	_formData: FormData,
): Promise<ActionState> {
	const response = await auth.signOut({
		headers: await headers(),
		asResponse: true,
	});

	if (response.ok) {
		revalidatePath("/");
		return { success: true };
	}

	console.error(await response.text());
	return {
		success: false,
		message: "An unexpected error occurred. Please try again.",
	};
}
