"use client";

import { useRouter } from "next/navigation";
import { type ComponentProps, useActionState, useEffect } from "react";
import type { Button } from "@/shared/ui";
import { SubmitButton } from "@/shared/ui";
import { logout } from "../model/actions";

export function LogOutButton(props: ComponentProps<typeof Button>) {
	const router = useRouter();
	const [state, formAction] = useActionState(logout, {});

	useEffect(() => {
		if (state.success) router.push("/");
	}, [state.success, router]);

	return (
		<form action={formAction}>
			<SubmitButton {...props}>Log Out</SubmitButton>
		</form>
	);
}
