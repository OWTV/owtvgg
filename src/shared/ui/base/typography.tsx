import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ElementType } from "react";
import { cn } from "../../lib/utils";

const typographyVariants = cva("", {
	variants: {
		variant: {
			h1: "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance",
			h2: "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0",
			h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
			h4: "scroll-m-20 text-xl font-semibold tracking-tight",
			p: "leading-7 [&:not(:first-child)]:mt-6",
			blockquote: "mt-6 border-l-2 pl-6 italic",
			list: "my-6 ml-6 list-disc [&>li]:mt-2",
			inlineCode:
				"bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
			lead: "text-muted-foreground text-xl",
			large: "text-lg font-semibold",
			small: "text-sm leading-none font-medium",
			muted: "text-muted-foreground text-sm",
		},
	},
});

type TypographyProps<T extends ElementType> = ComponentPropsWithRef<T> &
	VariantProps<typeof typographyVariants> & {
		as?: T;
		className?: string;
	};

export function Typography<T extends ElementType = "span">({
	as,
	variant,
	className,
	...props
}: TypographyProps<T>) {
	const Tag = as || "span";

	return (
		<Tag
			className={cn(typographyVariants({ variant: variant ?? Tag }), className)}
			{...props}
		/>
	);
}
