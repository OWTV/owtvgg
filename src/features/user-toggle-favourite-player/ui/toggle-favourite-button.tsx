"use client";

import { Heart } from "lucide-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui";
import { toggleFavouritePlayer } from "../model/actions";

type ToggleFavouriteButtonProps = {
	playerId: number;
	isFavourite: boolean;
};

function ActionButton({ isFavourite }: { isFavourite: boolean }) {
	const { pending } = useFormStatus();
	return (
		<Button
			type="submit"
			variant="ghost"
			size="icon-sm"
			disabled={pending}
			aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
		>
			<Heart
				className={cn(
					"size-4 transition-all",
					isFavourite
						? "fill-red-500 text-red-500"
						: "text-muted-foreground hover:text-red-500",
				)}
			/>
		</Button>
	);
}

export function ToggleFavouriteButton({
	playerId,
	isFavourite,
}: ToggleFavouriteButtonProps) {
	const [state, formAction] = useActionState(toggleFavouritePlayer, {});

	return (
		<form action={formAction}>
			<input type="hidden" name="playerId" value={playerId} />
			<ActionButton isFavourite={isFavourite} />
			{state.error && <p className="text-xs text-destructive">{state.error}</p>}
		</form>
	);
}
