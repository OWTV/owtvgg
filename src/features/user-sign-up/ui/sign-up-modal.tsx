"use client";

import { useRouter } from "next/navigation";
import { type ComponentProps, useActionState, useEffect } from "react";
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
import { signup } from "../model/actions";

export function SignUpModal({ ...props }: ComponentProps<typeof Button>) {
	const router = useRouter();
	const [state, formAction] = useActionState(signup, {});

	useEffect(() => {
		if (state.success) router.refresh();
	}, [state.success, router]);

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

					{state.error && (
						<p className="text-sm font-medium text-destructive">
							{state.error}
						</p>
					)}

					<div className="grid grid-cols-4 gap-4">
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							name="name"
							type="text"
							placeholder="John Doe"
							className="col-span-3"
							required
						/>
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
						<Label htmlFor="confirm-password">Confirm</Label>
						<Input
							id="confirm-password"
							name="confirm-password"
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
						<SubmitButton>Sign Up</SubmitButton>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
