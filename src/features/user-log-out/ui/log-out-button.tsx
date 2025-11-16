"use client";

import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ComponentProps, useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { logout } from "../model/actions";

export function LogOutButton(props: ComponentProps<typeof Button>) {
	const router = useRouter();
	const [state, formAction] = useActionState(logout, {});
	const { pending } = useFormStatus();

	useEffect(() => {
		if (state.success) router.push("/");
	}, [state.success, router]);

	return (
		<form action={formAction}>
			<Button type="submit" disabled={pending} {...props}>
				<span className={cn({ invisible: pending })}>Log Out</span>
				<LoaderCircle
					className={cn("animate-spin invisible absolute", {
						visible: pending,
					})}
				/>
			</Button>
		</form>
	);
}
