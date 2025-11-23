import { LoaderCircle } from "lucide-react";
import type { ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { cn } from "../../lib/utils";
import { Button } from "../base/button";

export function SubmitButton({
	children,
	disabled,
	...props
}: ComponentProps<typeof Button>) {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" disabled={disabled || pending} {...props}>
			<span className={cn({ invisible: pending })}>{children}</span>
			<LoaderCircle
				className={cn("animate-spin invisible absolute", {
					visible: pending,
				})}
			/>
		</Button>
	);
}
