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
import { signup } from "../model/actions";

export function SignUpModal({ ...props }: ComponentProps<typeof Button>) {
	const router = useRouter();
	const [state, formAction] = useActionState(signup, { success: null });
	const errors = state.errors?.properties;

	useEffect(() => {
		if (!state.success) return;
		toast.success(state.message ?? "Account created successfully.");
		router.refresh();
	}, [state, router]);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button {...props} />
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<form action={formAction} className="flex flex-col gap-4">
					<DialogHeader>
						<DialogTitle>Sign Up</DialogTitle>
						<DialogDescription>
							Create your account. It's quick and easy.
						</DialogDescription>
					</DialogHeader>

					{!state.success && state.message && (
						<p className="text-sm font-medium text-destructive">
							{state.message}
						</p>
					)}
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor="name">Name</FieldLabel>
							<Input
								id="name"
								name="name"
								type="text"
								placeholder="John Doe"
								className="col-span-3"
								required
							/>
							<FieldError
								errors={errors?.name?.errors?.map((msg) => ({
									message: msg,
								}))}
							/>
						</Field>
						<Field>
							<FieldLabel htmlFor="email">Email</FieldLabel>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="name@example.com"
								className="col-span-3"
								required
							/>
							<FieldError
								errors={errors?.email?.errors?.map((msg) => ({
									message: msg,
								}))}
							/>
						</Field>
						<Field>
							<FieldLabel htmlFor="password">Password</FieldLabel>
							<Input
								id="password"
								name="password"
								type="password"
								className="col-span-3"
								required
							/>
							<FieldError
								errors={errors?.password?.errors?.map((msg) => ({
									message: msg,
								}))}
							/>
						</Field>
						<Field>
							<FieldLabel htmlFor="confirm-password">Confirm</FieldLabel>
							<Input
								id="confirm-password"
								name="confirm-password"
								type="password"
								className="col-span-3"
								required
							/>
							<FieldError
								errors={errors?.confirmPassword?.errors?.map((msg) => ({
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
						<SubmitButton>Sign Up</SubmitButton>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
