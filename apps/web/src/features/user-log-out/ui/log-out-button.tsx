"use client";

import { type ComponentProps, useActionState } from "react";
import type { Button } from "../../../shared/ui/base";
import { SubmitButton } from "../../../shared/ui/form";
import { logout } from "../model/actions";

export function LogOutButton(props: ComponentProps<typeof Button>) {
	const [_state, formAction] = useActionState(logout, { success: null });

	return (
		<form action={formAction}>
			<SubmitButton {...props}>Log Out</SubmitButton>
		</form>
	);
}
