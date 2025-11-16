"use server";

import { constants } from "node:http2";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import type { ActionResult } from "@/shared/model";
import { auth } from "@/shared/model";

export async function logIn(
	_prevState: ActionResult,
	formData: FormData,
): Promise<ActionResult> {
	const email = formData.get("email");
	const password = formData.get("password");

	if (!email || typeof email !== "string") {
		return { error: "Email is required" };
	}
	if (!password || typeof password !== "string") {
		return { error: "Password is required" };
	}

	const response = await auth.signInEmail({
		body: {
			email,
			password,
		},
		headers: await headers(),
		asResponse: true,
	});

	revalidatePath("/");
	if (response.ok) return { success: true };

	switch (response.status) {
		case constants.HTTP_STATUS_UNAUTHORIZED:
			return { error: "Invalid email or password. Please try again." };
	}

	console.error(await response.json());
	return { error: "An unexpected error occurred. Please try again." };
}
