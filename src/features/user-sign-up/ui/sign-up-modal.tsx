"use client";

import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ComponentProps, useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { signup } from "../model/actions";

export function SignUpModal({ ...props }: ComponentProps<typeof Button>) {
	const router = useRouter();
	const [state, formAction] = useActionState(signup, {});
	const { pending } = useFormStatus();

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
						<Button type="submit" disabled={pending} {...props}>
							<span className={cn({ invisible: pending })}>Sign Up</span>
							<LoaderCircle
								className={cn("animate-spin invisible absolute", {
									visible: pending,
								})}
							/>
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
