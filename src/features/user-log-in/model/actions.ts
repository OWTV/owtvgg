"use server";

import { constants } from "node:http2";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";
import type { ActionResult } from "@/shared/model";
import { auth } from "@/shared/model";
import { LoginSchema } from "./schema";

export async function logIn(
	_prevState: ActionResult,
	formData: FormData,
): Promise<ActionResult> {
	const validationResult = LoginSchema.safeParse(
		Object.fromEntries(formData.entries()),
	);

	if (!validationResult.success) {
		return {
			success: false,
			message: z.prettifyError(validationResult.error),
		};
	}

	const { email, password } = validationResult.data;

	const response = await auth.signInEmail({
		body: {
			email,
			password,
		},
		headers: await headers(),
		asResponse: true,
	});

	if (response.ok) {
		revalidatePath("/");
		return { success: true };
	}

	console.error(await response.text());

	switch (response.status) {
		case constants.HTTP_STATUS_UNAUTHORIZED:
			return {
				success: false,
				message: "Invalid email or password. Please try again.",
			};
	}

	return {
		success: false,
		message: "An unexpected error occurred. Please try again.",
	};
}
