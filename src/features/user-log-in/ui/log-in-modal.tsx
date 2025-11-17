"use client";

import { useRouter } from "next/navigation";
import { type ComponentProps, useActionState, useEffect } from "react";
import { toast } from "sonner";
import { ACTION_STATE } from "@/shared/config";
import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Input,
	Label,
} from "@/shared/ui/base";
import { SubmitButton } from "@/shared/ui/form";
import { logIn } from "../model/actions";

export function LogInModal({ ...props }: ComponentProps<typeof Button>) {
	const router = useRouter();
	const [state, formAction] = useActionState(logIn, ACTION_STATE);

	useEffect(() => {
		if (!state.success) return;
		toast.success(state.message ?? "Log in successful.");
		router.push("/");
	}, [state, router]);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button {...props} />
			</DialogTrigger>
			<DialogContent>
				<form action={formAction} className="flex flex-col gap-4">
					<DialogHeader>
						<DialogTitle>Log In</DialogTitle>
						<DialogDescription>
							Enter your email and password to access your account.
						</DialogDescription>
					</DialogHeader>

					{state.success && state.message && (
						<p className="text-sm font-medium text-destructive">
							{state.message}
						</p>
					)}

					<div className="grid grid-cols-4 gap-4">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="name@example.com"
							className="col-span-3"
							required
						/>
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							name="password"
							type="password"
							className="col-span-3"
							required
						/>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button type="button" variant={"ghost"}>
								Cancel
							</Button>
						</DialogClose>
						<SubmitButton>Log In</SubmitButton>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
