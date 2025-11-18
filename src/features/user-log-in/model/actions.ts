"use server";

import { constants } from "node:http2";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";
import type { ActionState } from "@/shared/model";

import { auth } from "@/shared/model";
import { LoginSchema } from "./schema";

export async function logIn(
	_prevState: ActionState<typeof LoginSchema>,
	formData: FormData,
): Promise<ActionState<typeof LoginSchema>> {
	const validationResult = LoginSchema.safeParse(
		Object.fromEntries(formData.entries()),
	);

	if (!validationResult.success) {
		return {
			success: false,
			errors: z.treeifyError(validationResult.error),
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

	switch (response.status) {
		case constants.HTTP_STATUS_UNAUTHORIZED:
			return {
				success: false,
				message: "Invalid email or password. Please try again.",
			};
	}

	console.error(await response.text());
	revalidatePath("/");
	return {
		success: false,
		message: "An unexpected error occurred. Please try again.",
	};
}
