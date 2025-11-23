"use server";

import { constants } from "node:http2";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";
import { getServerSession } from "../../../entities/user-session";
import type { ActionState } from "../../../shared/model";
import { auth } from "../../../shared/model";
import { SignupSchema } from "./schema";

export async function signup(
	_prevState: ActionState<typeof SignupSchema>,
	formData: FormData,
): Promise<ActionState<typeof SignupSchema>> {
	const session = await getServerSession();

	if (session) {
		return {
			success: false,
			message: "You are already logged in.",
		};
	}

	const validationResult = SignupSchema.safeParse(
		Object.fromEntries(formData.entries()),
	);

	if (!validationResult.success) {
		return {
			success: false,
			message: z.prettifyError(validationResult.error),
		};
	}

	const { email, password, name } = validationResult.data;

	const response = await auth.signUpEmail({
		body: {
			email,
			password,
			name,
		},
		headers: await headers(),
		asResponse: true,
	});

	if (response.ok) {
		revalidatePath("/");
		return { success: true };
	}

	switch (response.status) {
		case constants.HTTP_STATUS_UNPROCESSABLE_ENTITY:
			return {
				success: false,
				message: "A user with this email already exists.",
			};
	}

	console.error(await response.text());
	revalidatePath("/");
	return {
		success: false,
		message: "An unexpected error occurred. Please try again.",
	};
}
