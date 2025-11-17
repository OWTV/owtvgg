"use client";

import { useRouter } from "next/navigation";
import { type ComponentProps, useActionState, useEffect } from "react";
import { toast } from "sonner";
import type { Button } from "@/shared/ui/base";
import { SubmitButton } from "@/shared/ui/form";
import { logout } from "../model/actions";

export function LogOutButton(props: ComponentProps<typeof Button>) {
	const router = useRouter();
	const [state, formAction] = useActionState(logout, { success: null });

	useEffect(() => {
		if (!state.success) return;
		toast.success(state.message ?? "You have been logged out.");
		router.push("/");
	}, [state, router]);

	return (
		<form action={formAction}>
			<SubmitButton {...props}>Log Out</SubmitButton>
		</form>
	);
}
