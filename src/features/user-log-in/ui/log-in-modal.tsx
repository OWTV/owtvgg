"use client";

import { useRouter } from "next/navigation";
import { type ComponentProps, useActionState, useEffect } from "react";
import { toast } from "sonner";
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
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	Input,
} from "@/shared/ui/base";
import { SubmitButton } from "@/shared/ui/form";
import { logIn } from "../model/actions";

export function LogInModal({ ...props }: ComponentProps<typeof Button>) {
	const router = useRouter();
	const [state, formAction] = useActionState(logIn, { success: null });
	const errors = state.errors?.properties;

	useEffect(() => {
		if (!state.success) return;
		toast.success(state.message ?? "Log in successful.");
		router.refresh();
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

					{!state.success && state.message && (
						<p className="text-sm font-medium text-destructive">
							{state.message}
						</p>
					)}

					<FieldGroup>
						<Field>
							<FieldLabel htmlFor="email">Email</FieldLabel>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="name@example.com"
								required
							/>
							<FieldError
								errors={errors?.email?.errors?.map((msg) => ({
									message: msg,
								}))}
							/>
						</Field>

						<Field>
							<FieldLabel htmlFor="email">Password</FieldLabel>
							<Input id="password" name="password" type="password" required />
							<FieldError
								errors={errors?.password?.errors?.map((msg) => ({
									message: msg,
								}))}
							/>
						</Field>
					</FieldGroup>

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
